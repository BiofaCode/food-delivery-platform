
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_migrate import Migrate
import os
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
import stripe
from datetime import datetime, timedelta

app = Flask(__name__)
CORS(app) # Enable CORS for all origins

# --- Nouvelle configuration de la base de données par composants ---
# Récupérez ces valeurs depuis la section "Connections" de votre DB sur Render.com
DB_HOSTNAME = os.getenv("DB_HOSTNAME", "dpg-d1hq833e5dus739af47g-a") # Remplacez YOUR_HOSTNAME
DB_PORT = os.getenv("DB_PORT", "5432") # Remplacez YOUR_PORT (généralement 5432)
DB_NAME = os.getenv("DB_NAME", "food_delivery_db_wnh8") # Remplacez YOUR_DATABASE_NAME
DB_USER = os.getenv("DB_USER", "food_delivery_db_wnh8_user") # Remplacez YOUR_USERNAME
DB_PASSWORD = os.getenv("DB_PASSWORD", "2bN1TAPFwm1t6PRKpPnYvwX0lNIbw1OW") # Remplacez YOUR_PASSWORD

# Construire l'URL de la base de données à partir des composants
# Nous utilisons postgresql+psycopg2 pour spécifier explicitement le driver
app.config["SQLALCHEMY_DATABASE_URI"] = (
    f"postgresql+psycopg2://{DB_USER}:{DB_PASSWORD}@{DB_HOSTNAME}:{DB_PORT}/{DB_NAME}"
)

print(f"DEBUG: Constructed DB URL = {app.config["SQLALCHEMY_DATABASE_URI"]}")

app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
# ------------------------------------------------------------------

db = SQLAlchemy(app)
migrate = Migrate(app, db)


# Modèles de la base de données
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128))
    role = db.Column(db.String(20), default="client")  # "client" or "restaurateur"
    stripe_customer_id = db.Column(db.String(120), unique=True, nullable=True)

    restaurants = db.relationship("Restaurant", backref="owner", lazy=True)
    subscriptions = db.relationship("Subscription", backref="user", lazy=True)
    orders = db.relationship("Order", backref="customer", lazy=True)

    def __repr__(self):
        return f"<User {self.username}>"


class Restaurant(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    address = db.Column(db.String(200), nullable=False)
    phone = db.Column(db.String(20))
    email = db.Column(db.String(120))
    description = db.Column(db.Text)
    opening_hours = db.Column(db.String(200))
    image_url = db.Column(db.String(200))
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)

    dishes = db.relationship("Dish", backref="restaurant", lazy=True)
    orders = db.relationship(
        "Order", backref="restaurant_obj", lazy=True
    )  # Renamed to avoid conflict with "restaurant" backref

    def __repr__(self):
        return f"<Restaurant {self.name}>"


class Dish(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    price = db.Column(db.Float, nullable=False)
    image_url = db.Column(db.String(200))
    restaurant_id = db.Column(
        db.Integer, db.ForeignKey("restaurant.id"), nullable=False
    )

    order_lines = db.relationship("OrderLine", backref="dish", lazy=True)

    def __repr__(self):
        return f"<Dish {self.name}>"


class Subscription(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    stripe_subscription_id = db.Column(db.String(120), unique=True, nullable=False)
    status = db.Column(db.String(50), nullable=False)
    start_date = db.Column(db.DateTime, nullable=False)
    end_date = db.Column(db.DateTime, nullable=True)
    plan_id = db.Column(db.String(120), nullable=False)  # e.g., "price_12345"

    def __repr__(self):
        return f"<Subscription {self.stripe_subscription_id}>"


class Order(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    restaurant_id = db.Column(
        db.Integer, db.ForeignKey("restaurant.id"), nullable=False
    )
    order_date = db.Column(db.DateTime, nullable=False, default=db.func.now())
    status = db.Column(db.String(50), default="pending")
    total = db.Column(db.Float, nullable=False)

    order_lines = db.relationship("OrderLine", backref="order", lazy=True)

    def __repr__(self):
        return f"<Order {self.id}>"


class OrderLine(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, db.ForeignKey("order.id"), nullable=False)
    dish_id = db.Column(db.Integer, db.ForeignKey("dish.id"), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    unit_price = db.Column(db.Float, nullable=False)

    def __repr__(self):
        return f"<OrderLine {self.id}>"


# Exemple de route
@app.route("/")
def index():
    return "Bienvenue sur l'API de livraison de nourriture!"


if __name__ == "__main__":
    # db.create_all() # Commented out as we will use migrations
    app.run(debug=True)





# Routes d'authentification
@app.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    username = data.get("username")
    email = data.get("email")
    password = data.get("password")

    if not username or not email or not password:
        return jsonify({"message": "Missing username, email or password"}), 400

    if User.query.filter_by(username=username).first() or User.query.filter_by(email=email).first():
        return jsonify({"message": "User with that username or email already exists"}), 409

    # In a real application, hash the password before saving
    new_user = User(username=username, email=email, password_hash=password) # Placeholder for hashed password
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User created successfully"}), 201

@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    user = User.query.filter_by(username=username).first()

    # In a real application, verify the hashed password
    if not user or user.password_hash != password: # Placeholder for password verification
        return jsonify({"message": "Invalid credentials"}), 401

    return jsonify({"message": "Logged in successfully", "user_id": user.id, "role": user.role}), 200

# Routes pour les restaurants
@app.route("/restaurants", methods=["POST"])
def create_restaurant():
    data = request.get_json()
    name = data.get("name")
    address = data.get("address")
    user_id = data.get("user_id") # Assuming user_id is provided for now

    if not name or not address or not user_id:
        return jsonify({"message": "Missing name, address or user_id"}), 400

    new_restaurant = Restaurant(name=name, address=address, user_id=user_id)
    db.session.add(new_restaurant)
    db.session.commit()

    return jsonify({"message": "Restaurant created successfully", "id": new_restaurant.id}), 201

@app.route("/restaurants", methods=["GET"])
def get_restaurants():
    restaurants = Restaurant.query.all()
    output = []
    for restaurant in restaurants:
        output.append({"id": restaurant.id, "name": restaurant.name, "address": restaurant.address})
    return jsonify({"restaurants": output}), 200

@app.route("/restaurants/<int:restaurant_id>", methods=["GET"])
def get_restaurant(restaurant_id):
    restaurant = Restaurant.query.get_or_404(restaurant_id)
    return jsonify({"id": restaurant.id, "name": restaurant.name, "address": restaurant.address}), 200

# Routes pour les plats
@app.route("/dishes", methods=["POST"])
def create_dish():
    data = request.get_json()
    name = data.get("name")
    price = data.get("price")
    restaurant_id = data.get("restaurant_id")

    if not name or not price or not restaurant_id:
        return jsonify({"message": "Missing name, price or restaurant_id"}), 400

    new_dish = Dish(name=name, price=price, restaurant_id=restaurant_id)
    db.session.add(new_dish)
    db.session.commit()

    return jsonify({"message": "Dish created successfully", "id": new_dish.id}), 201

@app.route("/restaurants/<int:restaurant_id>/dishes", methods=["GET"])
def get_restaurant_dishes(restaurant_id):
    restaurant = Restaurant.query.get_or_404(restaurant_id)
    dishes = Dish.query.filter_by(restaurant_id=restaurant.id).all()
    output = []
    for dish in dishes:
        output.append({"id": dish.id, "name": dish.name, "price": dish.price})
    return jsonify({"dishes": output}), 200




import stripe
from datetime import datetime

# Configuration Stripe
stripe.api_key = os.environ.get("STRIPE_SECRET_KEY")

# Routes pour les abonnements Stripe
@app.route("/create-checkout-session", methods=["POST"])
def create_checkout_session():
    data = request.get_json()
    user_id = data.get("user_id")
    price_id = data.get("price_id")  # Stripe price ID for the subscription plan

    if not user_id or not price_id:
        return jsonify({"message": "Missing user_id or price_id"}), 400

    user = User.query.get_or_404(user_id)

    try:
        # Create or retrieve Stripe customer
        if not user.stripe_customer_id:
            customer = stripe.Customer.create(
                email=user.email,
                name=user.username,
            )
            user.stripe_customer_id = customer.id
            db.session.commit()
        else:
            customer = stripe.Customer.retrieve(user.stripe_customer_id)

        # Create Stripe Checkout Session
        checkout_session = stripe.checkout.Session.create(
            customer=customer.id,
            line_items=[
                {
                    "price": price_id,
                    "quantity": 1,
                }
            ],
            mode="subscription",
            success_url="http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}",
            cancel_url="http://localhost:3000/cancel",
        )

        return jsonify({"url": checkout_session.url}), 200

    except stripe.error.StripeError as e:
        return jsonify({"message": str(e)}), 400

@app.route("/stripe-webhook", methods=["POST"])
def stripe_webhook():
    payload = request.get_data()
    sig_header = request.headers.get("Stripe-Signature")
    endpoint_secret = os.environ.get("STRIPE_WEBHOOK_SECRET")

    try:
        event = stripe.Webhook.construct_event(payload, sig_header, endpoint_secret)
    except ValueError:
        return jsonify({"message": "Invalid payload"}), 400
    except stripe.error.SignatureVerificationError:
        return jsonify({"message": "Invalid signature"}), 400

    # Handle the event
    if event["type"] == "checkout.session.completed":
        session = event["data"]["object"]
        handle_checkout_session_completed(session)
    elif event["type"] == "invoice.payment_succeeded":
        invoice = event["data"]["object"]
        handle_invoice_payment_succeeded(invoice)
    elif event["type"] == "customer.subscription.deleted":
        subscription = event["data"]["object"]
        handle_subscription_deleted(subscription)

    return jsonify({"message": "Success"}), 200

def handle_checkout_session_completed(session):
    # Retrieve the subscription
    subscription_id = session["subscription"]
    stripe_subscription = stripe.Subscription.retrieve(subscription_id)
    
    # Find the user by customer ID
    customer_id = session["customer"]
    user = User.query.filter_by(stripe_customer_id=customer_id).first()
    
    if user:
        # Create or update the subscription record
        subscription = Subscription.query.filter_by(stripe_subscription_id=subscription_id).first()
        if not subscription:
            subscription = Subscription(
                user_id=user.id,
                stripe_subscription_id=subscription_id,
                status=stripe_subscription["status"],
                start_date=datetime.fromtimestamp(stripe_subscription["current_period_start"]),
                end_date=datetime.fromtimestamp(stripe_subscription["current_period_end"]),
                plan_id=stripe_subscription["items"]["data"][0]["price"]["id"]
            )
            db.session.add(subscription)
        else:
            subscription.status = stripe_subscription["status"]
            subscription.start_date = datetime.fromtimestamp(stripe_subscription["current_period_start"])
            subscription.end_date = datetime.fromtimestamp(stripe_subscription["current_period_end"])
        
        db.session.commit()

def handle_invoice_payment_succeeded(invoice):
    # Handle successful subscription renewal
    subscription_id = invoice["subscription"]
    stripe_subscription = stripe.Subscription.retrieve(subscription_id)
    
    subscription = Subscription.query.filter_by(stripe_subscription_id=subscription_id).first()
    if subscription:
        subscription.status = stripe_subscription["status"]
        subscription.end_date = datetime.fromtimestamp(stripe_subscription["current_period_end"])
        db.session.commit()

def handle_subscription_deleted(stripe_subscription):
    # Handle subscription cancellation
    subscription_id = stripe_subscription["id"]
    subscription = Subscription.query.filter_by(stripe_subscription_id=subscription_id).first()
    if subscription:
        subscription.status = "canceled"
        db.session.commit()

# Route pour vérifier le statut d'abonnement d'un utilisateur
@app.route("/users/<int:user_id>/subscription", methods=["GET"])
def get_user_subscription(user_id):
    user = User.query.get_or_404(user_id)
    subscription = Subscription.query.filter_by(user_id=user.id).order_by(Subscription.id.desc()).first()
    
    if not subscription:
        return jsonify({"message": "No subscription found"}), 404
    
    return jsonify({
        "id": subscription.id,
        "status": subscription.status,
        "start_date": subscription.start_date.isoformat(),
        "end_date": subscription.end_date.isoformat() if subscription.end_date else None,
        "plan_id": subscription.plan_id
    }), 200

