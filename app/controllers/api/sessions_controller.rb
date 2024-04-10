class Api::SessionsController < ApplicationController
  skip_before_action :verify_authenticity_token
#   before_action :require_logged_in, only: [:destroy]


  def show

    if current_user
      @user = current_user
      render json: @user
    else 
    render json: { errors: ["not current user"] }, status: :unauthorized 
    end 

  end

  def create
    if params[:user].present? && params[:user][:email].present? && params[:user][:password].present?
      @user = User.find_by_credentials(params[:user][:email], params[:user][:password])

      if @user
        login(@user)
        render json: @user 
      else
        render json: { errors: ["Invalid email or password"] }, status: :unauthorized
      end
    else
      render json: { errors: ["Email and password are required"] }, status: :bad_request
    end
  end

  def destroy
    if logged_in?
      logout 
      head :ok
    else
      render json: { errors: ["User is not logged in"] }, status: :unprocessable_entity
    end
end


end