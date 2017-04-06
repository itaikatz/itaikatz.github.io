module Jekyll
	module TernaryFilter
	  def if(value, true_output, untrue_output = '')
	    value ? true_output : untrue_output
	  end

	  def unless(value, untrue_output, true_output = '')
	    value ? true_output : untrue_output
	  end
	end
end

Liquid::Template.register_filter(Jekyll::TernaryFilter)


