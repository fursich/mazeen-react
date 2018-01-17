Rails.application.routes.draw do
  root to: 'maze#index'

  namespace :api, defaults: {format: :json} do
    namespace :v1 do
      resources :maze, only: :new do
        collection do
          post 'solve'
        end
      end
    end
  end

end
