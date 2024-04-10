# require 'rails_helper'

# RSpec.describe Api::TicketsController, type: :controller do
#   describe 'GET #index' do
#     context 'when user is authenticated' do
#       let(:user) { create(:user) }
#       before { sign_in user }

#       it 'returns a success response' do
#         get :index
#         expect(response).to have_http_status(:ok)
#       end
#     end

#     context 'when user is not authenticated' do
#       it 'returns an unauthorized response' do
#         get :index
#         expect(response).to have_http_status(:unauthorized)
#       end
#     end
#   end

#   describe 'GET #show' do
#     let(:ticket) { create(:ticket) }

#     it 'returns a success response' do
#       get :show, params: { id: ticket.id }
#       expect(response).to have_http_status(:ok)
#     end

#     it 'returns the correct ticket' do
#       get :show, params: { id: ticket.id }
#       expect(assigns(:ticket)).to eq(ticket)
#     end

#     it 'returns an error response if the ticket does not exist' do
#       get :show, params: { id: 'invalid_id' }
#       expect(response).to have_http_status(:not_found)
#     end
#   end

#   describe 'POST #create' do
#     let(:user) { create(:user) }
#     let(:valid_attributes) { attributes_for(:ticket) }

#     context 'when user is authenticated' do
#       before { sign_in user }

#       it 'creates a new ticket' do
#         expect {
#           post :create, params: { ticket: valid_attributes }
#         }.to change(Ticket, :count).by(1)
#       end

#       it 'returns a success response' do
#         post :create, params: { ticket: valid_attributes }
#         expect(response).to have_http_status(:created)
#       end
#     end

#     context 'when user is not authenticated' do
#       it 'returns an unauthorized response' do
#         post :create, params: { ticket: valid_attributes }
#         expect(response).to have_http_status(:unauthorized)
#       end
#     end
#   end

# end