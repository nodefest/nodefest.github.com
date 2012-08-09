require 'sass'

module Jekyll
  class ScssFile < StaticFile
    def initialize(dest_path, content)
      @dest_path = dest_path
      @content  = content
    end

    def destination(dest)
      File.join(dest, @dest_path)
    end

    def write(dest)
      dest_path = destination(dest)
      FileUtils.mkdir_p(File.dirname(dest_path))
      open(dest_path, 'w') {|f| f.write @content}
      true
    end
  end

  class ScssGenerator < Generator
    safe true
    priority :low

    def generate(site)
      conf = site.config['scss'] || {}
      src_dir = conf['source'] || '_scss'
      dest_dir = conf['destination'] || 'css'
      error_msg = "\e[31mSass compile error!\e[0m"

      Dir.glob("#{src_dir}/[^_]*.scss") do |file_path|
        sass_engine = Sass::Engine.for_file(file_path, {
          :cache => conf['cache'] == nil ? true : conf['cache'],
          :cache_location => conf['cache_location'] || '.sass-cache',
          :load_paths => [src_dir],
          :syntax => :scss,
          :style => :expanded,
        })

        dest_filename = File.basename(file_path).sub(/\.scss$/, '.css')
        dest_path = File.join(dest_dir, dest_filename)
        begin
          site.static_files << ScssFile.new(dest_path, sass_engine.render)
        rescue Sass::SyntaxError => e
          puts error_msg
          puts e.sass_backtrace_str
        rescue => e
          puts "\e[31mSass compile error!\e[0m"
          puts e
        end
      end
    end
  end
end
