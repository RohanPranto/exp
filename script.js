$(function(){
    const strL = 'https://images.unsplash.com/photo-';
    const strR = '?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ';
    const imgs = [
      {
        descripcion: 'Meet Dhruv and Srija,My left and right atrium. This photo was captured at a book fair,around 9.',
        titulo: 'Heart(s)',
        url:("images/ori1.jpg")
      },
      {
        descripcion: 'I see a lot of fog and a few lights. I like it when life`s hidden. It gives you a chance to imagine nice things, nicer than they are. -Ben Hecht.',
        titulo: 'Peek-a-boo',
        url:("images/ori7.jpg"),
      },
      {
        descripcion: 'Lights will guide you home.',
        titulo: 'Cold Nights',
        url: ("images/ori3.jpg"),
      },
      {
        descripcion: 'EVERY STEP YOU TAKE IN THIS WORLD LEAVES A TRAIL• OF LIGHT BEHIND YOU.',
        titulo: 'Magic Paint',
        url: ("images/ori4.jpeg"),
      },
      {
        descripcion: 'When we look out into space, we are looking back in time; the light from a galaxy a billion light-years away, for instance, will take a billion years to reach us. Its an amazing thing. The history is there for us to see. Its not mushed up like the geologic record of Earth. You can just see it exactly as it was.',
        titulo: 'Astro',
        url: ("images/ori9.jpg"),
      },
      {
        descripcion: 'Everything good, everything magical, happens between the months of June and August." —Jenny Han',
        titulo: 'Summer Days',
        url: ("images/ori8.jpeg"),
      }
    ]
  
    $.each(imgs, function(i, img){
      $('.galeria .contenedorImgs').append(`
        <div class="imagen" style="background-image:url('${img.url}')">
          <p class="nombre">${img.titulo}</p>
        </div>`
      );
    }) 
    setTimeout(() => {
      $('.galeria').addClass('vis');
    }, 1000)
    $('.galeria').on('click', '.contenedorImgs .imagen', function(){
      var imagen = imgs[$(this).index()].url;
      var titulo = imgs[$(this).index()].titulo;
      var descripcion = imgs[$(this).index()].descripcion;
      $('.galeria').addClass('scale');
      $(this).addClass('activa');
      if(!$('.fullPreview').length){
        $('body').append(`
          <div class="fullPreview">
            <div class="cerrarModal"></div>
            <div class="wrapper">
              <div class="blur" style="background-image:url(${imagen})"></div>
              <p class="titulo">${titulo}</p>
              <img src="${imagen}">
              <p class="desc">${descripcion}</p>
            </div>
            <div class="controles">
              <div class="control av"></div>
              <div class="control ret"></div>
            </div>
          </div>`
        )
        $('.fullPreview').fadeIn().css('display','flex');
      }
    })
    $('body').on('click', '.fullPreview .cerrarModal', function(){
      $('.contenedorImgs .imagen.activa').removeClass('activa');
      $('.galeria').removeClass('scale');
      $(this).parent().fadeOut(function(){
        $(this).remove();
      })
    })
    $('body').on('click', '.fullPreview .control', function(){
      var activa = $('.contenedorImgs .imagen.activa');
      var index;
      if($(this).hasClass('av')){
        index = activa.next().index();
        if(index < 0) index = 0;
      }else{
        index = activa.prev().index();
        if(index < 0) index = imgs.length - 1;
      }
      $('.fullPreview').addClass('anim');
      setTimeout(()=>{
        $('.contenedorImgs .imagen.activa').removeClass('activa');
        $('.contenedorImgs .imagen').eq(index).addClass('activa');
        $('.fullPreview').find('.blur').css('background-image', 'url('+imgs[index].url+')');
        $('.fullPreview').find('img').attr('src', imgs[index].url);
        $('.fullPreview').find('.titulo').text(imgs[index].titulo);
        $('.fullPreview').find('.desc').text(imgs[index].descripcion);
        $('.fullPreview').removeClass('anim');
      }, 500)
    })
  })
