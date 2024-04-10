class User < ApplicationRecord
    has_many :tickets, dependent: :destroy 

  # # Validations
  validates :name, presence: true
  validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :password_digest, presence: true
  validates :role, inclusion: { in: %w(user admin) }


    def admin?
    role == 'admin'
  end

     attr_reader :password
    after_initialize :ensure_session_token

    def self.find_by_credentials(email, password)
        user = User.find_by(email: email)
        return nil if user.nil?
        user.is_password?(password) ? user : nil
    end 

    def password=(password)
        @password = password
        self.password_digest = BCrypt::Password.create(password)
    end

    def is_password?(password)
        BCrypt::Password.new(self.password_digest).is_password?(password)
    end

    def reset_session_token!
        self.session_token = SecureRandom.base64(64)
        self.save!
        self.session_token
    end

    def ensure_session_token
        self.session_token ||= SecureRandom.base64(64)
    end
    
end
