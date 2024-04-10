class CreateTickets < ActiveRecord::Migration[6.1]
  def change
    create_table :tickets do |t|
      t.string :name
      t.string :email
      t.text :description
      t.string :status, default: "new"

      t.timestamps
    end
  end
end
