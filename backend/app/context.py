from app.models.user import User

class AppContext:

  # dummy
  @staticmethod
  def get_current_user() -> User:
    return User(id=1, name='Randy')