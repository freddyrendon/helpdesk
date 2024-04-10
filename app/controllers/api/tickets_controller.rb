class Api::TicketsController < ApplicationController
  skip_before_action :verify_authenticity_token 
  before_action :set_ticket, only: %i[ show edit update destroy ]



  def index
    if current_user
      if current_user.admin?
        @tickets = Ticket.all
      else
        @tickets = current_user.tickets
      end
      render 'api/tickets/index', status: :ok
    else
      render json: { error: 'Unauthorized' }, status: :unauthorized
    end
  end


  def show

    @ticket = Ticket.find_by(id: params[:id])

    if @ticket
      render json: @ticket
    else
      render json: ['Ticket does not exist'], status: 404

    end

  end


  def new
    @ticket = Ticket.new
  end



def create
  if current_user
    @ticket = current_user.tickets.build(ticket_params)

    if @ticket.save
      render json: @ticket, status: :created
    else
      render json: @ticket.errors.full_messages, status: :unprocessable_entity
    end
  else
    render json: { error: "User not authenticated" }, status: :unauthorized
  end
end


  def update
    @ticket = Ticket.find_by(id: params[:id])
    
    if @ticket.update(ticket_params)
      render json: @ticket, status: :ok
    else
    render json: { errors: @ticket.errors.full_messages }, status: :unprocessable_entity
    end
  end


def destroy
  @ticket = Ticket.find(params[:id])
  @ticket.destroy

end


  private
  def set_ticket
    @ticket = Ticket.find_by(id: params[:id])
    render json: { error: "Ticket not found" }, status: :not_found unless @ticket
  end

    
    def ticket_params
      params.require(:ticket).permit(:name, :email, :description, :status)
    end
end
