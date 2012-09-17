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
  sh "bundle exec jekyll --auto --server #{port}"
end

#desc 'deploy to github pages'
#task :deploy do
#  unless Dir.exists? 'github-pages'
#    sh 'git clone git@github.com:nodefest/nodefest.github.com.git github-pages'
#  end
#
#  sh 'bundle exec jekyll'
#  sh 'rm -rf github-pages/2012/*'
#  sh 'cp -R _site/2012/* github-pages/2012'
#  cd 'github-pages' do
#    sh 'git add -A'
#    sh 'git commit -v'
#    sh 'git push origin master'
#  end
#end
