(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['task'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"task-container\" data-group=\""
    + alias4(((helper = (helper = helpers.task_id || (depth0 != null ? depth0.task_id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"task_id","hash":{},"data":data}) : helper)))
    + "\" data-group=\""
    + alias4(((helper = (helper = helpers.task_group || (depth0 != null ? depth0.task_group : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"task_group","hash":{},"data":data}) : helper)))
    + "\" data-priority=\""
    + alias4(((helper = (helper = helpers.task_priority || (depth0 != null ? depth0.task_priority : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"task_priority","hash":{},"data":data}) : helper)))
    + "\">\r\n	<span>\r\n		<h1 class=\"short-desc\">"
    + alias4(((helper = (helper = helpers.task_title || (depth0 != null ? depth0.task_title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"task_title","hash":{},"data":data}) : helper)))
    + "</h1>\r\n		<h1 class=\"add-date\">"
    + alias4(((helper = (helper = helpers.date_added || (depth0 != null ? depth0.date_added : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"date_added","hash":{},"data":data}) : helper)))
    + "</h1>\r\n		<h1 class=\"due-date\">"
    + alias4(((helper = (helper = helpers.date_due || (depth0 != null ? depth0.date_due : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"date_due","hash":{},"data":data}) : helper)))
    + "</h1>\r\n		<button class=\"remove-task\">x</button>\r\n		<i class=\"material-icons edit-task\">mode_edit</i>\r\n	</span>\r\n</div>\r\n";
},"useData":true});
})();