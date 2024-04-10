FactoryBot.define do
  factory :user do
    name { "John Doe" }
    email { "john@example.com" }
    password_digest { BCrypt::Password.create("password123") }
    role { "user" }
  end
end
