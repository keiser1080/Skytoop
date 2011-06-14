// jQuery File Tree Plugin
//
// Version 1.01
//
// Cory S.N. LaViska
// A Beautiful Site (http://abeautifulsite.net/)
// 24 March 2008
//
// Visit http://abeautifulsite.net/notebook.php?article=58 for more information
//
// Usage: $('.fileTreeDemo').fileTree( options, callback )
//
// Options:  root           - root folder to display; default = /
//           script         - location of the serverside AJAX file to use; default = jqueryFileTree.php
//           folderEvent    - event to trigger expand/collapse; default = click
//           expandSpeed    - default = 500 (ms); use -1 for no animation
//           collapseSpeed  - default = 500 (ms); use -1 for no animation
//           expandEasing   - easing function to use on expand (optional)
//           collapseEasing - easing function to use on collapse (optional)
//           multiFolder    - whether or not to limit the browser to one subfolder at a time
//           loadMessage    - Message to display while initial tree loads (can be HTML)
//
// History:
//
// 1.01 - updated to work with foreign characters in directory/file names (12 April 2008)
// 1.00 - released (24 March 2008)
//
// TERMS OF USE
// 
// jQuery File Tree is licensed under a Creative Commons License and is copyrighted (C)2008 by Cory S.N. LaViska.
// For details, visit http://creativecommons.org/licenses/by/3.0/us/
//
if(jQuery) (function($){
    
    $.extend($.fn, {
        fileTree: function(o, h) {
            // Defaults
            if( !o ) var o = {};
            if( o.root == undefined ) o.root = '/UserFiles';
            if( o.script == undefined ) o.script = 'dirlist';
            if( o.folderEvent == undefined ) o.folderEvent = 'click';
            if( o.expandSpeed == undefined ) o.expandSpeed= 20;
            if( o.collapseSpeed == undefined ) o.collapseSpeed= 20;
            if( o.expandEasing == undefined ) o.expandEasing = null;
            if( o.collapseEasing == undefined ) o.collapseEasing = null;
            if( o.multiFolder == undefined ) o.multiFolder = true;
            if( o.loadMessage == undefined ) o.loadMessage = 'Loading...';
            if( o.folderCallback == undefined ) o.folderCallback = null;
            if( o.after == undefined ) o.after = null;
            
            $(this).each( function() {
                
                function showTree(c, t) {
                    //$(c).addClass('wait');
                    $(".jqueryFileTree.start").remove();
                    $.post(o.script, { dir: t }, function(data) {
                        $(c).find('.start').html('');
                        $(c).removeClass('wait').append(data);
                        if( o.root == t ) $(c).find('UL:hidden').show(); else $(c).find('UL:hidden').slideDown('fast');
                        bindTree(c);
                        o.after(data);
                    });
                }
                
                function bindTree(t) {
		    $(t).find('LI A').click(function(){
			    $('#fileinfo').addClass('waitfordata');
			    o.folderCallback($(this).attr('rel'));
			    $('#fileinfo').removeClass('waitfordata');
			    

			    if( $(this).parent().hasClass('directory') ) {
				// NE AS EXECUTER LES DEUX EVENTS EN MM TMPS (CLICK ET DBL)
				/*				if( $(this).parent().hasClass('collapsed') ) {
				    $(this).parent().find('UL').remove(); // cleanup
				    showTree( $(this).parent(), escape($(this).attr('rel').match( /.*\// )) );
				    $(this).parent().removeClass('collapsed').addClass('expanded');
				    }*/
			    }


			}).dblclick(function(){				
				if( $(this).parent().hasClass('directory') ) {
				    if( $(this).parent().hasClass('collapsed') ) {
					$(this).parent().find('UL').remove(); // cleanup
					showTree( $(this).parent(), escape($(this).attr('rel').match( /.*\// )) );
					$(this).parent().removeClass('collapsed').addClass('expanded');
					} else {
					$(this).parent().find('UL').slideUp('fast');
					$(this).parent().removeClass('expanded').addClass('collapsed');
									    }
					}
			    });
                    // Prevent A from triggering the # on non-click events
                    if( o.folderEvent.toLowerCase != 'click' ) $(t).find('LI A').bind('click', function() { return false; });
                }
                // Loading message
                $(this).html('<ul class="jqueryFileTree start"><li class="wait">' + o.loadMessage + '<li></ul>');
                // Get the initial file list
                showTree( $(this), escape(o.root) );
            });
        }
    });
    
})(jQuery);