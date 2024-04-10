require 'rails_helper'

RSpec.describe User, type: :model do 
  describe "validations" do
    it { should validate_presence_of(:name) }
    it { should validate_presence_of(:email) }
    it { should validate_uniqueness_of(:email) }
    it { should allow_value("user@example.com").for(:email) }
    it { should_not allow_value("invalid_email").for(:email) }
    it { should validate_presence_of(:password_digest) }
    it { should validate_inclusion_of(:role).in_array(%w[user admin]) }
  end
  describe 'associations' do
    it { should have_many(:tickets).dependent(:destroy) }
  end

  describe '#admin?' do
    let(:user) { FactoryBot.create(:user, role: 'user') }
    let(:admin) { FactoryBot.create(:user, role: 'admin') }

    it 'returns true if user is an admin' do
      expect(admin.admin?).to be true
    end

    it 'returns false if user is not an admin' do
      expect(user.admin?).to be false
    end
  end

  describe 'password encryption' do
    let(:user) { FactoryBot.create(:user, password: 'password123') }

    it 'encrypts the password' do
      expect(user.password_digest).not_to eq('password123')
    end

    it 'authenticates with correct password' do
      expect(user.is_password?('password123')).to be true
    end

    it 'does not authenticate with incorrect password' do
      expect(user.is_password?('incorrect_password')).to be false
    end
  end

  describe 'session token' do
    let(:user) { FactoryBot.create(:user) }

    it 'ensures session token is generated on initialization' do
      expect(user.session_token).not_to be_nil
    end

    it 'resets session token' do
      old_session_token = user.session_token
      user.reset_session_token!
      expect(user.session_token).not_to eq(old_session_token)
    end
  end

  describe '.find_by_credentials' do
    let!(:user) { FactoryBot.create(:user, email: 'user@example.com', password: 'password123') }

    it 'returns user when given valid credentials' do
      expect(User.find_by_credentials('user@example.com', 'password123')).to eq(user)
    end

    it 'returns nil when given invalid credentials' do
      expect(User.find_by_credentials('user@example.com', 'incorrect_password')).to be_nil
    end
  end
end