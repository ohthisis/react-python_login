from flask_bcrypt import Bcrypt
from flask import Flask, jsonify, request,session
from models import db, User
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.config['SECRET_KEY'] = 'ohthisis'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///flaskdb.db'

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True

bcrypt=Bcrypt(app)
db.init_app(app)

with app.app_context():
    db.create_all()

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/signup", methods=["POST"])
def signup():
    email = request.json["email"]
    password = request.json["password"]
    print(email,password)

    user_exit = User.query.filter_by(email=email).first() is not None
    if user_exit:
        return jsonify({"error": "Email already exists"}), 409
    
    hashed_password = bcrypt.generate_password_hash(password).decode("utf-8")
    new_user = User(email=email, password=hashed_password)

    db.session.add(new_user)
    db.session.commit()

    session["user_id"] = new_user.id

    return jsonify({
        "id": new_user.id,
        "email": email,
        "password": hashed_password
    })


@app.route("/login",methods=["POST"])
def login_user():
    email=request.json["email"]
    password=request.json["password"]

    user=User.query.filter_by(email=email).first()
    if user is None:
        return jsonify({"error":"Unauthorized Access"}),401
    
    if not bcrypt.check_password_hash(user.password,password):
        return jsonify({"error":"Unauthorized"}),401
    session["user_id"]=user.id

    return jsonify({
        "id":user.id,
        "email":email,
        "password":password
    })

if __name__ == "__main__":
    app.run(debug=True)
