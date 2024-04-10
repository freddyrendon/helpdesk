class Api::UsersController < ApplicationController
  # before_action :authenticate_user!, except: [:create] # Ensure user is authenticated except for user creation
    skip_before_action :verify_authenticity_token

  def create
    @user = User.new(user_params)
    if @user.save
      render json: { message: 'User created successfully' }, status: :created
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :email, :password, :role)
  end
end
