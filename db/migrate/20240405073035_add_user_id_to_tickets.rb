class AddUserIdToTickets < ActiveRecord::Migration[6.1]
  def change
    add_reference :tickets, :user, foreign_key: true
  end
end
