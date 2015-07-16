
$(document).ready(function(event){
  console.log("all things are loaded...thanks, yayQuery!");
  $('.honeycombs').honeycombs({
      combWidth: 200,
      margin: 10
});
});





  //honeycomb functionality

  (function($) {

      $.fn.honeycombs = function(options) {

          // Establish our default settings
          var settings = $.extend({
              combWidth: 200,
              margin: 10
          }, options);

          function initialise(element) {

              $(element).addClass('honeycombs-wrapper');

              var width = 0;
              var combWidth = 0;
              var combHeight = 0;
              var num = 0;
              var $wrapper = null;

              /**
               * Build the dom
               */
              function buildHtml(){
                  // add the 2 other boxes
                  $(element).find('.comb').wrapAll('<div class="honeycombs-inner-wrapper"></div>');
                  $wrapper = $(element).find('.honeycombs-inner-wrapper');

                  $(element).find('.comb').append('<div class="hex_l"></div>');
                  $(element).find('.hex_l').append('<div class="hex_r"></div>');
                  $(element).find('.hex_r').append('<div class="hex_inner"></div>');

                  $(element).find('.hex_inner').append('<div class="inner_span"><div class="inner-text"></div></div>');

                  num = 0;

                  $(element).find('.comb').each(function(){
                      num = num + 1;
                      var image = $(this).find('img').attr('src');
                      var css = 'url("'+image+'") ';

                      $(this).find('.hex_inner').attr('style', 'background-image: '+css);

                      if($(this).find('span').length > 0){
                          $(this).find('.inner_span .inner-text').html($(this).find('span').html());
                      }else{
                          $(this).find('.inner_span').remove();
                      };
                  });

                  $(element).find('img, span, .inner_span').hide();
              }

              /**
               * Update all scale values
               */
              function updateScales(){
                  combWidth = settings.combWidth;
                  combHeight = ( Math.sqrt(3) * combWidth ) / 2;
                  edgeWidth = combWidth / 2;


                  $(element).find('.comb').width(combWidth).height(combHeight);
                  $(element).find('.hex_l, .hex_r').width(combWidth).height(combHeight);
                  $(element).find('.hex_inner').width(combWidth).height(combHeight);
              }

              /**
               * update css classes
               */
              function reorder(animate){

                  updateScales();
                  width = $(element).width();

                  newWidth = ( num / 1.5) * settings.combWidth;

                  if(newWidth < width){
                      width = newWidth;
                  }

                  $wrapper.width(width);

                  var row = 0; // current row
                  var upDown = 1; // 1 is down
                  var left = 0; // pos left
                  var top = 0; // pos top

                  var cols = 0;

                  $(element).find('.comb').each(function(index){

                      top = ( row * (combHeight + settings.margin) ) + (upDown * (combHeight / 2 + (settings.margin / 2)));

                      if(animate == true){
                          $(this).stop(true, false);
                          $(this).animate({'left': left, 'top': top});
                      }else{
                          $(this).css('left', left).css('top', top);
                      }

                      left = left + ( combWidth - combWidth / 4 + settings.margin );
                      upDown = (upDown + 1) % 2;

                      if(row == 0){
                          cols = cols + 1;
                      }

                      if(left + combWidth > width){
                          left = 0;
                          row = row + 1;
                          upDown = 1;
                      }
                  });

                  $wrapper
                      .width(cols * (combWidth / 4 * 3 + settings.margin) + combWidth / 4)
                      .height((row + 1) * (combHeight + settings.margin) + combHeight / 2);
              }

              $(window).resize(function(){
                  reorder(true);
              });

              $(element).find('.mouse').mouseenter(function(){
                  $(this).find('.inner_span').stop(true, true);
                  $(this).find('.inner_span').fadeIn();
              });

              $(element).find('.comb').mouseleave(function(){
                  $(this).find('.inner_span').stop(true, true);
                  $(this).find('.inner_span').fadeOut();
              });

              buildHtml();
              reorder(false);
          }

          return this.each(function() {
              initialise(this);
          });

      }

  }(jQuery));

//End Honeycomb



//Ajax Practice
var app=app || {};
app.getRequest = {
  type: 'get',
  url: 'https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=ShirleyIsSaying&count=1&status=test&in_reply_to=cs480test2&oauth_version=1.0&oauth_nonce=a73afdcceeb493853581e64f5801c951&oauth_timestamp=1411668337&oauth_consumer_key=lr7QWBCgG3YFzeSp0nMwPTATB&oauth_token=3330109984-HVE8nBnnKgyaKp5gjYpz1zfcIvR3iuksPzsTpQA&oauth_signature_method=HMAC-SHA1&oauth_signature=sd%2FkG89XLjyNCbcYDqgqG6gkIH0%3D',
  //url: 'https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=ShirleyIsSaying&count=1',
  dataType: 'jsonp',
  // data: {
  //   screen_name: 'ShirleyIsSaying',
  //   count: 1,
  // },
  success: function(data) {
    console.log(data);
  },
  error: function(error) {
    console.log(error);
  }
};

$.ajax(app.getRequest);

$.getJSON

















//Ajx Calls
//
//   //hide status messages
//   $('.loading').hide();
//   $('.success').hide();
//   $('.error').hide();
//
//
//   //contact submit event handler
//   $('#form_send').on('click', function() {
//     var formdata = app.createFormObject();
//     console.log('formdata');
//     console.log('Clicked form submit...');
//     app.sendEmail(formdata);
// });
// });
//
//
// var app = app || {};
// app.createFormObject = function() {
//
//   var retJson = {};
//
//   retJson.userName = $('#user_name').val();
//   retJson.userEmail = $('#user_email').val();
//   retJson.request = $('#user_request').val();
//   console.log('workd');
//
//   return retJson;
//
// };
//
// app.sendEmail = function(emailData){
//   //display loading info....
//   $('.loading').slideDown();
//   //hide old messages...because this is a NEW request
//   $('.success').hide();
//   $('.error').hide();
//   //create ajax argument
//     var ajaxData = {
//       url: 'http://imperialholonet.herokuapp.com/api/mail',
//       type: 'POST',
//       data: emailData,
//       success: function(data) {
//         console.log(data);
//         $('.loading').slideUp();
//         $('.success').show();
//       },
//       error: function(err) {
//         console.log(err);
//         $('.loading').slideUp();
//         $('.error').show();
//       }
//     };
//
//   $.ajax(ajaxData);
// };
