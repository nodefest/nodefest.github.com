require 'uglifier'

module Jekyll
  class JsFile < StaticFile
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

  class JsGenerator < Generator
    safe true
    priority :low

    def generate(site)
      conf = site.config['js'] || {}
      src_dir = conf['source'] || '_js'
      dest_dir = conf['destination'] || 'js'
      targets = conf['targets'] || {}
      targets.each do |filename, val|
        content = val['files'].map{|f| File.read("#{src_dir}/#{f}")}.join("\n")
        dest_path = File.join(dest_dir, filename)
        site.static_files << JsFile.new(dest_path, content)

        if val['min']
          min_dest_path = File.join(dest_dir, val['min'])
          site.static_files << JsFile.new(min_dest_path, Uglifier.compile(content))
        end
      end
    end
  end
end
