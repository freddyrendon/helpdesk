require 'rails_helper'

RSpec.describe Api::SessionsController, type: :controller do
  describe 'POST #create' do
    let!(:user) { create(:user, email: 'test@example.com', password: 'password123') }

    context 'with invalid credentials' do
      it 'returns unauthorized error' do
        post :create, params: { user: { email: 'test@example.com', password: 'invalid_password' } }
        expect(response).to have_http_status(:unauthorized)
        expect(session[:user_id]).to be_nil
        expect(JSON.parse(response.body)['errors']).to eq(['Invalid email or password'])
      end
    end

    context 'with missing parameters' do
      it 'returns bad request error' do
        post :create, params: { user: { email: 'test@example.com' } }
        expect(response).to have_http_status(:bad_request)
        expect(session[:user_id]).to be_nil
        expect(JSON.parse(response.body)['errors']).to eq(['Email and password are required'])
      end
    end
  end
end
