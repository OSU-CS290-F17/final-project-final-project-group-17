(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['group'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"group-container\" id=\"group-"
    + alias4(((helper = (helper = helpers.letter || (depth0 != null ? depth0.letter : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"letter","hash":{},"data":data}) : helper)))
    + "\">\n	<span class=\"group-container-header\" id=\"group-"
    + alias4(((helper = (helper = helpers.letter || (depth0 != null ? depth0.letter : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"letter","hash":{},"data":data}) : helper)))
    + "-header\">\n		<h2 class=\"group-header-title\">Group "
    + alias4(((helper = (helper = helpers.letter || (depth0 != null ? depth0.letter : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"letter","hash":{},"data":data}) : helper)))
    + "</h2>\n		<h2 class=\"group-header-add-task\" id=\"add-task-"
    + alias4(((helper = (helper = helpers.letter || (depth0 != null ? depth0.letter : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"letter","hash":{},"data":data}) : helper)))
    + "\">+</h2>\n	</span>\n</div>";
},"useData":true});
})();