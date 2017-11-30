(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['groupTemplate'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div id=\"container\">\n	<div class=\"group-container\" id=\"group-"
    + alias4(((helper = (helper = helpers.letter || (depth0 != null ? depth0.letter : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"letter","hash":{},"data":data}) : helper)))
    + "\">\n		<span class=\"group-container-header\" id=\"group-"
    + alias4(((helper = (helper = helpers.letter || (depth0 != null ? depth0.letter : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"letter","hash":{},"data":data}) : helper)))
    + "-header\">\n			<h2 class=\"group-header-title\">Group "
    + alias4(((helper = (helper = helpers.letter || (depth0 != null ? depth0.letter : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"letter","hash":{},"data":data}) : helper)))
    + "</h2>\n			<h2 class=\"group-header-add-task\" id=\"add-task-"
    + alias4(((helper = (helper = helpers.letter || (depth0 != null ? depth0.letter : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"letter","hash":{},"data":data}) : helper)))
    + "\">+</h2>\n		</span>\n\n		<div class=\"task-container\" data-group=\""
    + alias4(((helper = (helper = helpers.taskGroup || (depth0 != null ? depth0.taskGroup : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"taskGroup","hash":{},"data":data}) : helper)))
    + "\" data-priority=\""
    + alias4(((helper = (helper = helpers.taskPriority || (depth0 != null ? depth0.taskPriority : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"taskPriority","hash":{},"data":data}) : helper)))
    + "\">\n			<span>\n				<h1 class=\"short-desc\">"
    + alias4(((helper = (helper = helpers.taskShortDesc || (depth0 != null ? depth0.taskShortDesc : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"taskShortDesc","hash":{},"data":data}) : helper)))
    + "</h1>\n				<h1 class=\"add-date\">"
    + alias4(((helper = (helper = helpers.taskAddDate || (depth0 != null ? depth0.taskAddDate : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"taskAddDate","hash":{},"data":data}) : helper)))
    + "</h1>\n				<h1 class=\"due-date\">"
    + alias4(((helper = (helper = helpers.taskDueDate || (depth0 != null ? depth0.taskDueDate : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"taskDueDate","hash":{},"data":data}) : helper)))
    + "</h1>\n				<h1 class=\"remove-task\">--</h1>\n			</span>\n		</div>\n\n	</div>";
},"useData":true});
})();