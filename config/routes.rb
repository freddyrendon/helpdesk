Rails.application.routes.draw do

  namespace :api, defaults: { format: :json } do
    resources :users do
      resources :tickets
    end
    resource :session
  end

  

  get '*path', to: "static_pages#frontend_index"

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
