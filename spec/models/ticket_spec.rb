require 'rails_helper'

RSpec.describe Ticket, type: :model do
  describe 'validations' do
    it { should validate_presence_of(:name) }
    it { should validate_presence_of(:email) }
    it { should validate_presence_of(:description) }
    it { should validate_inclusion_of(:status).in_array(%w(new in_progress resolved)) }
    it { should allow_value('user@example.com').for(:email) }
    it { should_not allow_value('invalid_email').for(:email) }
  end

  describe 'associations' do
    it { should belong_to(:user) }
  end
end