@tickets.each do |ticket|
  json.set! ticket.id do
    json.extract! ticket, :id,:name,:email,:description,:status,:user_id
  end

end