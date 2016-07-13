$(function(){

	// the JSON returned from te call will be used as parameter to append method
	$.get('/blocks', appendToList);

	// ensure to be called when the form submit will be triggered
	$('form').on('submit', function(event){
		event.preventDefault();
		var form = $(this);
		var blockData = form.serialize();

		$.ajax({
			type: 'POST', url: '/blocks', data: blockData
		}).done(function(blockName){
			appendToList([blockName]);
			form.trigger('reset'); // cleans up form input text fields
		});
	});

	// intercept delete action by clicking on image
	$('.block-list').on('click', 'a[data-block]', function(event){
		if (!confirm('Are you sure?')) {
			return false;
		}

		var target = $(event.currentTarget);
		
		$.ajax({
			type: 'DELETE', url: '/blocks/' + target.data('block')
		}).done(function(){
			target.parents('li').remove();
		});
	});

	function appendToList(blocks) {
		var list = [];
		for(var i in blocks){
			block = blocks[i];
			content = '<a href="/blocks/'+block+'">'+block+'</a> '+
			'<a href="#" data-block="'+block+'"><img src="del.png"></a>';
			list.push($('<li>', {html: content}));
		}
		$('.block-list').append(list);
	}

});