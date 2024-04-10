require 'rails_helper'

RSpec.describe Api::UsersController, type: :controller do
  describe 'POST #create' do
    context 'with valid params' do
      let(:valid_attributes) do
        { name: 'John Doe', email: 'john@example.com', password: 'password123', role: 'user' }
      end

      it 'creates a new user' do
        expect {
          post :create, params: { user: valid_attributes }
        }.to change(User, :count).by(1)
      end

      it 'returns a success response' do
        post :create, params: { user: valid_attributes }
        expect(response).to have_http_status(:created)
      end
    end

    context 'with invalid params' do
      let(:invalid_attributes) { { name: nil, email: nil, password: nil, role: nil } }

      it 'does not create a new user' do
        expect {
          post :create, params: { user: invalid_attributes }
        }.to_not change(User, :count)
      end

      it 'returns an unprocessable_entity response' do
        post :create, params: { user: invalid_attributes }
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end
end