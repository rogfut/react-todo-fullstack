from pyexpat import model
from typing import List
from wsgiref import validate
from flask import Flask, render_template, request, redirect
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS, cross_origin
from flask import jsonify
import logging
import json


app = Flask(__name__)
default_headers = {"Content-Type": "application/json"}
CORS(app, resources={r"/*": {"origins": "*"}})


db = SQLAlchemy(app)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///todo.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db.init_app(app)
ma = Marshmallow(app)


class TodoModel(db.Model):
    __tablename__ = "tasks"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String())
    details = db.Column(db.String())
    priority = db.Column(db.String())
    tags = db.Column(db.String())
    status = db.Column(db.String())
    created_date = db.Column(db.DateTime(timezone=True), server_default=db.func.now())

    def __init__(self, name, details, priority, tags, status):
        self.name = name
        self.details = details
        self.priority = priority
        self.tags = tags
        self.status = status

    def __repr__(self):
        return f"{self.id}:{self.name}:{self.priority}:{self.tags}:{self.status}:{self.created_date}"


class TodoSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = TodoModel
        include_relationships = True
        load_instance = True

    id = ma.auto_field()
    name = ma.auto_field(required=True)
    details = ma.auto_field(required=True)
    priority = ma.auto_field(required=True)
    tags = ma.auto_field(required=False)
    status = ma.auto_field(required=False)


todo_schema = TodoSchema()
todo_schema_all = TodoSchema(many=True)

# INITIALIZE DB
@app.before_first_request
def create_table():
    db.create_all()


@app.before_request
def log_request_info():
    app.logger.debug("Headers: %s", request.headers)
    app.logger.debug("Body: %s", request.get_data())


# CREATE
@app.route("/data/create", methods=["GET", "POST"])
# @cross_origin()
def create():
    if request.method == "GET":
        return render_template("create.html")

    if request.method == "POST":
        errors = todo_schema.validate(request.form)
        if errors:
            return errors, 400, default_headers
        name = request.form["name"]
        details = request.form["details"]
        priority = request.form["priority"]
        tags = request.form["tags"]
        status = "open"
        todo = TodoModel(
            name=name, details=details, priority=priority, tags=tags, status=status
        )
        db.session.add(todo)
        db.session.commit()
        result = f"Inserted data into the task database: {name} // {details} // {priority} // {tags} // {status}"
        return result, 201


# READ
@app.route("/data", methods=["GET"])
# @cross_origin()
def RetrieveList():
    task_list = TodoModel.query.all()
    results = todo_schema_all.dump(task_list)
    return jsonify(results), 200


# READ SINGLE TODO
@app.route("/data/<int:id>")
@cross_origin()
def RetrieveTodo(id):
    todo = TodoModel.query.filter_by(id=id).first()
    if todo:
        return render_template("data.html", todo=todo)
    return f"todo with id ={id} Doenst exist"


# UPDATE
@app.route("/data/<int:id>/update", methods=["GET", "POST"])
# @cross_origin()
def update(id):
    todo = TodoModel.query.filter_by(id=id).first()
    if request.method == "POST":
        if todo:
            name = request.form["name"]
            details = request.form["details"]
            priority = request.form["priority"]
            status = request.form["status"]
            todo = TodoModel(id=id, name=name, details=details, priority=priority)
            db.session.add(todo)
            db.session.commit()
            return redirect(f"/data/{id}")
        return f"todo with id = {id} Does not exist"

    return render_template("update.html", todo=todo)


# COMPLETE
@app.route("/data/<int:id>/complete", methods=["PUT"])
def complete(id):
    todo = TodoModel.query.filter_by(id=id).first()
    if request.method == "PUT":
        status = "completed"
        todo = TodoModel(id=id, status=status)
        db.session.add(todo)
        db.session.commit()
        return f"task id {id} marked as complete", 200
    request.abort(400)


# BATCH COMPLETE
@app.route("/data/complete", methods=["POST"])
def batch_complete():
    # print(request.data.decode())
    ids = json.loads(request.data.decode())["ids"]
    todo = TodoModel.query.filter(TodoModel.id.in_(ids)).all()
    if request.method == "POST":
        for i in todo:
            i.status = "completed"
            db.session.add(i)
            db.session.commit()
        return f"tasks marked as complete", 200
    request.abort(400)


# DELETE
@app.route("/data/<int:id>/delete", methods=["GET", "POST"])
# @cross_origin()
def delete(id):
    todo = TodoModel.query.filter_by(id=id).first()
    if request.method == "POST":
        if todo:
            db.session.delete(todo)
            db.session.commit()
            return redirect("/data")
        request.abort(404)

    return render_template("delete.html")


# drops all
@app.route("/data/truncate", methods=["POST"])
def trunctate():
    todo = TodoModel.query.all()
    if request.method == "POST":
        if todo:
            TodoModel.__table__.drop(db.engine)
            return f"all to do rows deleted", 200
        else:
            return f"unable to delete rows", 400


app.run(host="localhost", port=5000)
