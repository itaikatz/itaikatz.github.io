# _plugins/highlight.rb
module Jekyll
  class HighlightTag < Liquid::Tag

    def initialize(tag_name, text, tokens)
      super
      @text = text
    end

    def render(context)
      category = context.environments.first["page"]["category"]
      if ( !category ) # In case user forgot to tag post with a "category" paramter
      	category = ""
      end	
      "<span class=\"highlight " + category + "\">#{@text}</span>"	
    end
  end
end

Liquid::Template.register_tag('highlight', Jekyll::HighlightTag)

# # _plugins/render_note.rb
# module Jekyll
#   class RenderNoteTag < Liquid::Tag

#     def initialize(tag_name, text, tokens)
#       super
#       @text = text
#     end

#     def render(context)
#       "<div class=\"alert alert-info\" role=\"alert\">#{@text}</div>"
#     end
#   end
# end

# Liquid::Template.register_tag('render_note', Jekyll::RenderNoteTag)