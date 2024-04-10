class Ticket < ApplicationRecord
      # Associations
  belongs_to :user

  # # Validations
  validates :name, presence: true
  validates :email, presence: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :description, presence: true
  validates :status, inclusion: { in: %w(new in_progress resolved) }
end
