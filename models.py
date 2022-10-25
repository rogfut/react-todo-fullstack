from flask_sqlalchemy import SQLAlchemy
from app import ma

db = SQLAlchemy()


class TodoModel(db.Model):
    __tablename__ = "table"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String())
    details = db.Column(db.String())
    priority = db.Column(db.String())
    tags = db.Column(db.String())
    created_date = db.Column(db.DateTime(timezone=True), server_default=db.func.now())
    status = db.Column(db.String())

    def __init__(self, name, details, priority, tags):
        self.name = name
        self.details = details
        self.priority = priority
        self.tags = tags
        self.status = "open"

    def __repr__(self):
        return f"{self.id}:{self.name}:{self.priority}:{self.tags}:{self.created_date}:{self.status}"


class TodoSchema(ma.ModelSchema):
    class Meta:
        fields = ("id", "name", "details", "priority", "tags", "created_date", "status")
