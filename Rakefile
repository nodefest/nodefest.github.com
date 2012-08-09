desc 'setup env'
task :setup do
  sh 'bundle install --path vendor/bundle'
end

desc 'build files'
task :build do
  sh "bundle exec jekyll"
end

desc 'run jekyll server'
task :server do
  port = ENV['PORT'] || '4000'
  sh "bundle exec jekyll --server --auto #{port}"
end
