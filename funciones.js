$(function () {
    //función que llama a un listado de anuncios de la base de datos
    escaparate();


    //función que muestra un formulario de invitado, pero con el usuario seleccionado
    ingresar_login();

    //muestra un listado con los anuncios del invitado registrado
    anuncios_invitado();

    //Functión para agregar anuncios cuando el usuario esta registrado
    agregar_anuncios();

    //borrado de registros de invitado cuando esta reg de la base de datos anuncios
    delete_anuncios();

    //botón para ingresar invitado con el id seleccionado
    $('#enviar_agregar').on('click', enviar_agregar);


    //muestra el listado de los administadors. también podemos ejecutar delete y update
    listado_administrador();

    //admintrador que puede crear los anunciantes por medio de un formulario
    agregar_anunciantes();

    //Función para borrar usuario de la tabla anunciantes
    delete_administrador();

    //función que comprueba que un usuario este registrado en la base de datos
    muestra_login_arriba();

    //Función para actualizar los anunciantes solo puede el administrador
    administrador_update();

    //Función para actualizar el formulario anuncios, de la zona invitado
    update_anuncios();

    //botón para ingresar invitrado agregando usuario y password
    $('#enviar_agregar_arriba').on('click', agregar_anuncios_invitado);



    validarIndex();
    //prueba2();
});








function escaparate() {
    let parametros = {
        'func': 'escaparate'
    };
    $.ajax({
        url: 'enviarDato.php',
        method: 'post',
        data: parametros,
        success: function (data) {
            data = $.parseJSON(data);
            if (data) {
                //funcion que muestra un listado de los anuncios
                muestraEscaparate(data);
            }
        },
        error: function (xhr, status) {
            alert('Dilculpe, existió un problema.');
        },
    });
}

/**
 * Función que muestra un listado de los anunciantes 
 * creados por el administrador 
 */
function listado_administrador() {
    let parametros = {
        'func': 'listar_anunciantes'
    };
    $.ajax({
        url: 'enviarDato.php',
        method: 'post',
        data: parametros,
        success: function (data) {
            data = $.parseJSON(data);
            try {
                muestraAdministrador(data);
            } catch (error) {

            }
        },
        error: function (xhr, status) {
            alert('Discupe, existió un problema');
        },
    });
}

/**
 * Función que muestra un listado de los anunciantes 
 * @param {*} data array con los valores del listado
 */
function muestraAdministrador(data) {
    let res = '';
    res = '<table class="table"><tr>';
    res += '<th class="adm_login">Login</th>';
    res += '<th class="adm_email">Email</th>';
    res += '<th>Bloqueado</th>';
    res += '<th class="adm_update">Update</th>';
    res += '<th class="adm_delete">Delete</th>';
    res += '</tr>';
    data.forEach(function (element) {
        res += '<tr><td>' + element.login + '</td>';
        res += '<td>' + element.email + '</td>';
        res += '<td>' + element.bloqueado + '</td>';
        res += '<td><button id="btn_update_administrador" data-cod1=' + element.login + '><span class="far fa-edit btn btn-success"></span></button></td>';
        res += '<td><button id="btn_delete_administrador" data-cod2=' + element.login + '><span class="far fa-trash-alt btn btn-danger"></span></button></td></tr>';
    });

    res += '</table>';
    //mostramos los valores por pantalla en un  listado
    $('#tabla3').html(res);
}


/**
 * Función que muestra un listado de los anuncios 
 * @param {*} data array con los valores del listado
 */
function muestraEscaparate(data) {
    let re = "";
    re = '<table><tr>';
    re += '<th class="tamano_ID">ID</th>';
    re += '<th class="tamano_autor">Autor</th>';
    re += '<th class="tamano_moroso">Moroso</th>';
    re += '<th class="tamano_localidad">Localidad</th>';
    re += '<th>Descripción</th>';
    re += '<th class="tamano_fecha">Fecha</th>';
    re += '<th class="tamano_botones">Mapa</th>';
    re += '<th class="tamano_botones">Login</th>';
    re += '</tr>';
    data.forEach(function (element) {
        re += '<tr><td>' + element.id_anuncio + '</td>';
        re += '<td>' + element.autor + '</td>';
        re += '<td>' + element.moroso + '</td>';
        re += '<td>' + element.localidad + '</td>';
        re += '<td>' + element.descripcion + '</td>';
        re += '<td>' + element.fecha + '</td>';
        re += '<td><button id="btn_mapa" data-cod1=' + element.autor + '><span class="fas fa-map-pin btn btn-success"></span></button></td>';
        re += '<td><button id="btn_login" data-cod2=' + element.autor + '><span class="fas fa-sign-in-alt btn btn-success"></span></button></td>';
        re += '</tr>';

    })
    re += '</table>';
    $('#tabla').html(re);
}


/**
 * Función para entrar un invitado por login para agregar anuncios
 */
function muestra_login_arriba() {
    $('#btn_login_arriba').on('click', function () {
        $('#login_invitado_arriba').show();
        $('#error_login_arriba').hide();
        $('#error_login_arriba_bloqueado').hide();
        //reseteamos los valores de usuario y password
        $('#invitado_login_arriba').val("");
        $('#invitado_password_arriba').val("");
    });

    //cierra el formulario de login del invitado
    $('#cerrar_invitado_arriba').on('click', function () {
        $('#login_invitado_arriba').hide();
    });

    $('#enviar_invitado_arriba').on('click', function () {
        let login_ok = false;
        let password_ok = false;


        let login = $('#invitado_login_arriba').val();
        let password = $('#invitado_password_arriba').val();


        //valida los campos para que no esten vacíos
        if (login == "") {
            $('#error_invitado_arriba').html("Login no puede estar vacío");
        } else {
            $('#error_invitado_arriba').html("");
            login_ok = true;
        }
        if (password == "") {
            $('#error_password_arriba').html("Password no puedo estar vacío");
        } else {
            $('#error_password_arriba').html("");
            password_ok = true;
        }

        //si los datos son correcto podemos comprobar el usuario

        if (login_ok && password_ok) {
            let parametros = {
                'func': 'invitado_login',
                'busc1': login,
                'busc2': password
            };
            $.ajax({
                url: 'enviarDato.php',
                method: 'post',
                data: parametros,
                success: function (data) {
                    data = $.parseJSON(data);
                    //console.log(data);
                    if (data == 0) {
                        //Comprobamos login y password si esta 0 muestra el formulario
                        mostrar_formulario_arriba();
                    } else if (data == 1) {
                        //si devuelve 1 el usuario esta bloqueado 
                        $('#error_login_arriba_bloqueado').show();
                        $('#error_login_arriba').hide();
                    } else if (data == 'error') {
                        $('#error_login_arriba').show();
                        $('#error_login_arriba_bloqueado').hide();
                    }
                },
                error: function (xhr, status) {
                    alert('Disculpe, existió un problema');
                }
            });
        }

    })
}


function mostrar_formulario_arriba() {


    $('#error_moroso').html("");
    $('#error_localidad').html("");
    $('#error_descripcion').html("");
    $('#error_fecha').html("");

    //cerramos el formulario
    $('#login_invitado_arriba').hide();
    $('#anuncio_arriba_ok').hide();
    $('#formulario_invitado_arriba').show();
    let autor_login = $('#invitado_login_arriba').val();
    //si es un input metemos el dato con val  value
    $('#arriba_autor').val(autor_login);
    //  $('#arriba_autor').html("El autor es >>> " + autor_login);
    $('#arriba_moroso').val("");
    $('#arriba_localidad').val("");
    $('#arriba_descripcion').val("");
    $('#arriba_fecha').val("");


    $('#cerrar_formulario_arriba').on('click', function () {
        $('#formulario_invitado_arriba').hide();
    })
}



let moroso_ok = false;
let localidad_ok = false;
let descripcion_ok = false;
let fecha_ok = false;


let moroso = "";
let localidad = "";
let descripcion = "";
let fecha = "";

function validarIndex() {


    //validamos los campos que no esten vacios

    $('#arriba_moroso').keyup(function () {
        // let moroso = $(this).val();       
        moroso = $('#arriba_moroso').val();
        if (moroso == "") {
            $('#error_moroso').html("Moroso 282 no puede estar vacío");
            moroso_ok = false;
        } else {
            $('#error_moroso').html("");
            moroso_ok = true;
        }
    });

    $('#arriba_localidad').keyup(function () {
        localidad = $('#arriba_localidad').val();
        if (localidad == "") {
            $('#error_localidad').html("Localidad no puede estar vacío");
            localidad_ok = false;
        } else {
            $('#error_localidad').html('');
            localidad_ok = true;
        }
    })

    $('#arriba_descripcion').keyup(function () {
        descripcion = $('#arriba_descripcion').val();
        if (descripcion == "") {
            $('#error_descripcion').html('Descripcion no puede estar vacío');
            descripcion_ok = false;
        } else {
            $('#error_descripcion').html('');
            descripcion_ok = true;
        }
    })


    //este codigo no se esta utilizando
    var now = new Date();
    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);
    var ano = now.getFullYear();
    var today = day + "/" + month + "/" + ano;
    // $('#arriba_fecha').val(today);



}

function agregar_anuncios_invitado() {

    // let moroso = $('#arriba_moroso').val();
    let autor = $('#arriba_autor').val();

    if (moroso == "") {
        $('#error_moroso').html("Moroso 330 no puede estar vacío");
    } else {
        $('#error_moroso').html("");
        moroso_ok = true;
    }
    if (localidad == "") {
        $('#error_localidad').html("Localidad no puede estar vacío");
    } else {
        $('#error_localidad').html('');
        localidad_ok = true;
    }
    if (descripcion == "") {
        $('#error_descripcion').html('Descripcion no puede estar vacío');
    } else {
        $('#error_descripcion').html('');
        descripcion_ok = true;
    }


    let fecha = document.querySelector('#arriba_fecha').value;
    if (fecha == "") {
        $('#error_fecha').html('Fecha2 no puede estar vacío');
        fecha_ok = false;
    } else {
        $('#error_fecha').html('');
        fecha_ok = true;
        // console.log(fecha);
    }


    /* console.log(autor);
     console.log(moroso);
     console.log(localidad);
     console.log(descripcion);
     console.log(fecha);*/

    console.log(moroso_ok + '-' + localidad_ok + '-' + descripcion_ok + '-' + fecha_ok);
    if (moroso_ok && localidad_ok && descripcion_ok && fecha_ok) {
        parametros = {
            'func': 'agregar_anuncios',
            'busc1': autor,
            'busc2': moroso,
            'busc3': localidad,
            'busc4': descripcion,
            'busc5': fecha
        };
        $.ajax({
            url: 'enviarDato.php',
            method: 'post',
            data: parametros,
            success: function (data) {
                data = $.parseJSON(data);
                if (data) {
                    $('#formulario_invitado_arriba').hide();
                    $('#anuncio_arriba_ok').show();
                    escaparate();
                    //si todo es correcto muestra un mensaje   
                    $('#anuncio_arriba_ok').hover(function () {
                        $('#anuncio_arriba_ok').hide();
                    });
                }
            },
            error: function (xhr, status) {
                alert('Disculpe, existió un problema');
            },
        });
    }
}

/**
 * Función para ingresar un usuario por login. pero ya tenemos el autor
 */
function ingresar_login() {

    $(document).on('click', '#btn_login', function () {
        $('#login_invitado_mostrar').trigger('reset');
        $('#login_invitado_incorrecto').hide();
        $('#error_password').html('');
        $('#login_invitado_mostrar').show();
        let id_autor = $(this).attr('data-cod2');

        $('#error_login_invitado').hide();

        //muestra el login por pantalla y no podemos modificar
        $('#invitado_login').val(id_autor);
        //muestra el login en un input oculto
        $('#login_invitado').val(id_autor);
    })


    //reseteamos lo valores del formulario y cerramos
    $('#cerrar_formulario_invitado').on('click', function () {
        $('#error_password').html("");
        // $('#error_login').html("erro login");
        $('#login_invitado_mostrar').hide();
    })

    $('#enviar_login_invitado').on('click', function () {
        let password_invitado_ok = false;

        let invitado = $('#invitado_login').val();
        let password = $('#invitado_password').val();

        // console.log(invitado);

        //validamos que todos los datos son correctos
        if (password == "") {
            $('#error_password').html("Password no puede estar vacío");
            $('#login_invitado_incorrecto').hide();
            $('#error_login_invitado').hide();
        } else {
            $('#error_password').html();
            password_invitado_ok = true;
        }
        //si todo es ok podemos mandar el formulario
        if (password_invitado_ok) {
            let parametros = {
                'func': 'invitado_login',
                'busc1': invitado,
                'busc2': password
            };
            $.ajax({
                url: 'enviarDato.php',
                method: 'post',
                data: parametros,
                success: function (data) {
                    //  try {
                    data = $.parseJSON(data);
                    //  console.log(data);
                    //si es 0 el usuario no esta bloqueado
                    if (data == 0) {
                        $('#login_invitado_mostrar').submit();
                    }
                    //usuario 1 esta bloqueado muestra el mensjae
                    if (data == 1) {
                        $('#error_login_invitado').show();
                        $('#login_invitado_incorrecto').hide();
                        $('#error_password').html('');
                        console.log(data);
                    }
                    if (data == "error") {
                        $('#login_invitado_incorrecto').show();
                        $('#error_login_invitado').hide();
                        $('#error_password').html('');
                    }
                    //   } catch (error) {
                    //codigo de error
                    //   }

                },
                error: function (xhr, status) {
                    alert('Disculpe, existio un problema');
                },
            });
        }
    });

}


/**
 * Función que muestra un listado del usuario que esta registrado 
 */
function anuncios_invitado() {
    //recuperamos el id del autor  que vamos listar sus anuncios
    let id_Autor = $('#invitado_login_ok').val();
    //console.log(id_Autor);
    let parametros = {
        'func': 'listar_invitado',
        'busc1': id_Autor
    };
    $.ajax({
        url: 'enviarDato.php',
        method: 'post',
        data: parametros,
        success: function (dato) {
            dato = $.parseJSON(dato)
            if (dato) {
                //si todo es correcto pasamos un array con el listado de los anuncios del autor
                muestraEscaparate1(dato);
            }
        },
        error: function (xhr, status) {
            console.log("Disculpe, existió un problema");
        }
    });
}

/**
 * Función que muestra un listado de los anuncios del usuario registrado
 * @param {*} dato array con los datos del usuario registro mostrando su anuncios con la opción de mapa, update y delete.
 */
function muestraEscaparate1(dato) {


    let res = '';
    res += '<table><tr>';
    res += '<th class="tamano_ID">ID</th>';
    res += '<th class="tamano_autor">Autor</th>';
    res += '<th class="tamano_moroso">Moroso</th>';
    res += '<th class="tamano_localidad">Localidad</th>';
    res += '<th> Descripción</th>';
    res += '<th class="tamano_fecha">Fecha</th>';
    res += '<th class="tamano_botones">Mapa</th>';
    res += '<th class="tamano_botones">Update</th>';
    res += '<th class="tamano_botones">Delete</th>';
    res += '</tr>';

    dato.forEach(function (element) {
        res += '<tr><td>' + element.id_anuncio + '</td>';
        res += '<td>' + element.autor + '</td>';
        res += '<td>' + element.moroso + '</td>';
        res += '<td>' + element.localidad + '</td>';
        res += '<td>' + element.descripcion + '</td>';
        res += '<td>' + element.fecha + '</td>';
        res += '<td><button id="btn_mapa" data-cod1=' + element.autor + '><span class="fas fa-map-pin btn btn-success"></span></button></td>';
        res += '<td><button id="btn_update_usuario" data-cod0=' + element.id_anuncio + '><span class="far fa-edit btn btn-success"></span></button></td>';
        res += '<td><button id="btn_delete" data-cod4=' + element.id_anuncio + '><span class="far fa-trash-alt btn btn-danger"></span></button></td>';

        res += '</tr>';
    })
    res += '</table>';
    $('#tabla1').html(res);
}


function agregar_anuncios() {

    //botón para agregar anuncios cuando el usuario esta registrado
    $('#btn_login_invitado').on('click', function () {

        $('#agregar_anuncios_formulario').show();
        $('#update_anuncios_formulario').hide(); //mostramos formulario
        $('#delete_anuncios_formulario').hide();

        validar_invitado_ok();
    })

    //botón para cerrar el formulario de agregar anuncios
    $('#cerrar_formulario_agregar').on('click', function () {
        $('#agregar_anuncios_formulario').hide();
        $('#agregar_anuncios_formulario').trigger('reset');
    });

}



function validar_invitado_ok() {

    $('#agregar_moroso').keyup(function () {
        let moroso = $('#agregar_moroso').val();
        if (moroso == "") {
            $('#error_moroso').html('Moroso 578 no puede estar vacío');
        } else {
            $('#error_moroso').html("");
        }
    });

    $('#agregar_localidad').keyup(function () {
        let localidad = $('#agregar_localidad').val();
        if (localidad == "") {
            $('#error_localidad').html('<p>Localidad no puede estar vacío</p>');
        } else {
            $('#error_localidad').html('');
        }
    })

    $('#agregar_descripcion').keyup(function () {
        let descripcion = $('#agregar_descripcion').val();
        //console.log(descripcion);
        if (descripcion == "") {
            $('#error_descripcion').html('<p>Descripcion no puede estar vacío</p>');
        } else {
            $('#error_descripcion').html("");
        }
    });

    $('#agregar_fecha').change(function () {
        let fecha = $('#agregar_fecha').val();
        // console.log(fecha);
        if (fecha == "") {
            $('#error_fecha').html('<p>Fecha no puede estar vacío</p>');
        } else {
            $('#error_fecha').html("");
        }
    });

}
/**
 * Función que recoge los datos del formulario los valida y manda a la base de datos
 */
function enviar_agregar() {

    let moroso_ok = false;
    let localidad_ok = false;
    let descripcion_ok = false;
    let fecha_ok = false;

    let autor = $('#invitado_login_ok').val();
    let moroso = $('#agregar_moroso').val();
    let localidad = $('#agregar_localidad').val();
    let descripcion = $('#agregar_descripcion').val();
    let fecha = $('#agregar_fecha').val();

    //validaciones de los campos
    if (moroso == "") {
        $('#error_moroso').html("Moroso 632 no puede estar vacío");
    } else {
        $('#error_moroso').html("");
        moroso_ok = true;
    }
    if (localidad == "") {
        $('#error_localidad').html("Localidad no puede estar vacío");
    } else {
        $('#error_localidad').html("");
        localidad_ok = true;
    }
    if (descripcion == "") {
        $('#error_descripcion').html("Descripción no puede estar vacío");
    } else {
        $('#error_descripcion').html("");
        descripcion_ok = true;
    }
    if (fecha == "") {
        $('#error_fecha').html("Fecha no puede estar vacío");
    } else {
        $('#error_fecha').html("");
        fecha_ok = true;
    }

    //console.log(moroso_ok + '-' + localidad_ok + '-' + descripcion_ok + '-' + fecha_ok);


    if (moroso_ok && localidad_ok && descripcion_ok && fecha_ok) {
        let parametros = {
            'func': 'agregar_anuncios',
            'busc1': autor,
            'busc2': moroso,
            'busc3': localidad,
            'busc4': descripcion,
            'busc5': fecha
        };

        $.ajax({
            url: 'enviarDato.php',
            method: 'post',
            data: parametros,
            success: function (data) {
                data = $.parseJSON(data);
                if (data) {
                    anuncios_invitado();
                    $('#agregar_anuncios_formulario').hide();
                    $('#agregado_anuncio_correctamente').show();

                    $('#agregado_anuncio_correctamente').hover(function () {
                        $('#agregado_anuncio_correctamente').hide();
                    });
                }
            },
            error: function (xhr, status) {
                console.log("Disculpe, existió un problema");
            }
        });
    }
}

/**
 * Función para actualizar el formulario de la base de datos anuncios
 */
function update_anuncios() {
    //botón para abrir el formulario y poder mostrar los los valores que vamos actutualzar 
    $(document).on('click', '#btn_update_usuario', function () {

        $('#update_repetido_oculto').hide(); //ocultamos mensaje error

        $('#delete_anuncios_formulario').hide(); //ocultamos formyulario delete
        $('#update_anuncios_formulario').show(); //mostramos formulario
        $('#agregar_anuncios_formulario').hide();

        //validamos que los campos esten completos con keyup
        validar_update_ok();

        //recuperamos el id da la tabla anuncios, lo utilizamos para mostrar su valores
        let id_anuncio = $(this).attr('data-cod0');
        //console.log(id_anuncio);
        let parametros = {
            'func': 'update_usuario',
            'busc': id_anuncio
        };
        $.ajax({
            url: 'enviarDato.php',
            method: 'post',
            data: parametros,
            success: function (data) {
                data = $.parseJSON(data);
                //pasamos los valores del array a la función para que muestre los valores en el formulario

                if (data) {
                    update_muestra_invitado(data);
                }
            },
            error: function (xhr, status) {
                console.log("Disculpe, existió un problema");
            }
        });
    });


    /**
     * Función para recuperar los valores del array y mostrar en el formulario
     * @param {*} data array que devuelve los valores, encontrados en la base de datos anuncios
     */
    function update_muestra_invitado(data) {
        $('#update_id_anuncio').val(data.id_anuncio);
        $('#update_autor').val(data.autor);
        $('#update_moroso').val(data.moroso);
        $('#update_localidad').val(data.localidad);
        $('#update_descripcion').val(data.descripcion);
        $('#update_fecha').val(data.fecha);
    }


    //botón para cerrar el formulario
    $('#cerrar_formulario_update').on('click', function () {
        $('#update_anuncios_formulario').hide();
    });

    //Cuando modificamos los valores del formulario podemos enviar para guardar en la base de datos
    $('#enviar_update').on('click', function () {
        let ID = $('#update_id_anuncio').val();
        let autor = $('#update_autor').val();
        let moroso = $('#update_moroso').val();
        let localidad = $('#update_localidad').val();
        let descripcion = $('#update_descripcion').val();
        let fecha = $('#update_fecha').val();

        //si pulsamos enviar update comprobamos que no este vacio

        if (moroso == "") {
            $('#error_moroso_up').html("Moroso  primero no puede estar vacío");
        } else {
            $('#error_moroso_up').html("");
            moroso_ok = true;
        }

        if (localidad == "") {
            $('#error_localidad_up').html("Localidad no puede estar vacío");
        } else {
            $('#error_localidad_up').html("");
            localidad_ok = true;
        }
        if (descripcion == "") {
            $('#error_descripcion_up').html("Descripción no puede estar vacío");
        } else {
            $('#error_descripcion_up').html("");
            descripcion_ok = true;
        }
        if (fecha == "") {
            $('#error_fecha_up').html("Fecha no puede estar vacío");
        } else {
            $('#error_fecha_up').html("");
            fecha_ok = true;
        }
        //console.log(moroso_ok + '-' + localidad_ok + '-' + descripcion_ok + '-' + fecha_ok);

        if (moroso_ok && localidad && descripcion && fecha) {
            let parametros = {
                'func': 'update_invitado_guardar',
                'busc1': ID,
                'busc2': moroso,
                'busc3': localidad,
                'busc4': descripcion,
                'busc5': fecha
            };
            $.ajax({
                url: 'enviarDato.php',
                method: 'post',
                data: parametros,
                success: function (data) {
                    //si todo es correcto llamamos a función anuncios_invitado()
                    if (data == 0) { //no hay cambios
                        $('#update_repetido_oculto').show();
                    }
                    if (data == 1) { //si hay cambios
                        anuncios_invitado(); //actualziamos la base de datos y mostramos resultado
                        $('#update_anuncios_formulario').hide();
                        $('#cuando_update_ok').show();
                        //muestra un mensaje si la update es correcta
                        $('#cuando_update_ok').hover(function () {
                            $('#cuando_update_ok').hide();
                        });
                    }
                },
                error: function () {
                    console.log("Disculpe, existió un problema");
                },
            });
        }
    });
}


/**
 * validamos el formulario update es distinto que el otro furmulario
 * con keyup 
 */
function validar_update_ok() {
    $('#update_moroso').keyup(function () {
        let moroso = $('#update_moroso').val();
        if (moroso == "") {
            $('#error_moroso_up').html('<p>Morosooooo  no puede estar vacío</p>')
            moroso_ok = false;
        } else {
            $('#error_moroso_up').html("");
            moroso_ok = true;
        }
    });
    $('#update_localidad').keyup(function () {
        let localidad = $('#update_localidad').val();
        if (localidad == "") {
            $('#error_localidad_up').html('<p>Localidad no puede estar vacío</p>');
            localidad_ok = false;
        } else {
            $('#error_localidad_up').html('');
            localidad_ok = true;
        }
    });
    $('#update_descripcion').keyup(function () {
        let descripcion = $('#update_descripcion').val();
        if (descripcion == "") {
            $('#error_descripcion_up').html('<p>Descripcion no puede estar vacío</p>');
        } else {
            $('#error_descripcion_up').html('');
        }
    });
    $('#update_fecha').keyup(function () {
        let fecha = $('#update_fecha').val();
        if (fecha == "") {
            $('#error_fecha_up').html('<p>Fecha no puede estar vacío</p>');
        } else {
            $('#error_fecha_up').html('');
        }
    });
}


function delete_anuncios() {
    let id_anuncio = "";
    $(document).on('click', '#btn_delete', function () {
        $('#delete_anuncios_formulario').show();
        $('#update_anuncios_formulario').hide();
        $('#agregar_anuncios_formulario').hide();
        //borramos mensaje de confirmado borrado ok
        $('#delete_registro_borrado').hide();

        //recuperamos el id de anuncio para borrar
        id_anuncio = $(this).attr('data-cod4');

        $('#delete_registro').html(id_anuncio);
    })

    //botón para cerrar el formulario de borrado de registros
    $('#cerrar_formulario_delete').on('click', function () {
        $('#delete_anuncios_formulario').hide();
    })

    //botón para confirmar el borrado de registro
    $('#enviar_delete').on('click', function () {
        let parametros = {
            'func': 'eliminar',
            'busc': id_anuncio
        };
        $.ajax({
            url: 'enviarDato.php',
            data: parametros,
            method: 'post',
            success: function (data) {

                //si data vale 1 registro borrado
                if (data == 1) {
                    $('#delete_anuncios_formulario').hide();
                    anuncios_invitado();

                    $('#delete_anuncio_ok').show();
                }
                if (data == 0) {
                    console.log("registro 0 " + data);
                }

            },
            error: function (xhr, status) {
                console.log("Disculpe, existió un problema");
            },
        });
    });
}


var login_ok = false;
/**
 * Función para agregar los anunciantes,  cuando el administrador entra en la página en nuestro caso el administador entra sin contraseña
 */
function agregar_anunciantes() {
    //botón que muestra el formulario para agregar anunciantes
    $('#btn_agregar_anunciantes').on('click', function () {

        $('#anunciantes_error').hide();
        $('#form_agregar_anunciantes').trigger('reset');
        $('#delete_administrador_formulario').hide();
        $('#form_update_anunciantes').hide();
        $('#form_agregar_anunciantes').show();

        $('#error_login').html('');
        $('#error_password').html('');
        $('error_email').html('');



        $('#anunciante_login').keyup(function () {
            // let moroso = $(this).val();       
            login = $('#anunciante_login').val();
            //console.log(login);
            if (login == "") {
                $('#error_login').html("login no puede estar  vacío978");
                oto_login_ok = false;
            } else {
                $('#error_login').html("");
                oto_login_ok = true;
            }
        });

        $('#anunciante_password').keyup(function () {
            password = $('#anunciante_password').val();
            // console.log(password);
            if (password == "") {
                $('#error_password').html("password  no puede estar  vacío978");
                password_ok = false;
            } else {
                $('#error_password').html("");
                password_ok = true;
            }
        });

        $('#anunciante_email').keyup(function () {
            email = $('#anunciante_email').val();
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(email)) {
                $('#error_email').html("");
                email_ok = true;
            } else {
                $('#error_email').html("Error del email.");
            }
        });


        /**
         * Función que comprueba el login del enunciante, para que no este repetido. 
         */
        $('#anunciante_login').keyup(function () {
            let valor_login = $(this).val();
            //console.log(valor_login);
            $('#error_login').html('');
            let parametros = {
                'func': 'buscar_login',
                'busc': valor_login
            };
            $.ajax({
                url: 'enviarDato.php',
                method: 'post',
                data: parametros,
                success: function (data) {
                    data = $.parseJSON(data);
                    if (data) {
                        $('#error_login').html('<p>Login esta repetido</p>');
                        login_ok = false;
                    } else {
                        $('#error_login').html('');
                        login_ok = true;
                    }
                },
                error: function (xhr, status) {
                    console.log('Disculpe, existió un problema');
                }
            });
        })



    })

    //botón que cierra el formulario 
    $('#cerrar_formulario_anunciantes').on('click', function () {
        $('#form_agregar_anunciantes').hide();
    });

    //botón para guardar los datos del anunciantes
    $('#guardar_formulario_anunciantes').on('click', guardar_anunciantes);
}

/**
 * formulario para agregar anunciantes y puedan crear anuncios
 */
function guardar_anunciantes() {

    console.log(login_ok);

    let oto_login_ok = false;
    let password_ok = false;
    let email_ok = false;


    //con id anunciante_login comprobamos que el login no este repetido, con la funcion comprobar_login()
    let login = $('#anunciante_login').val();
    let password = $('#anunciante_password').val();
    let email = $('#anunciante_email').val();
    let bloqueado = $('input[name="exampleRadios"]:checked').val();

    //validamos los 
    console.log(login_ok);

    if (login == "") {
        $('#error_login').html("Login no puede estar vacío");
    } else {
        if (login_ok) {
            $('#error_login').html("");
            oto_login_ok = true;
        } else {
            //esta repetido
            $('#error_login').html('<p>Login esta repetido1054</p>');
        }
    }

    if (password == "") {
        $('#error_password').html("Password no puede estar vacío");
    } else {
        $('#error_password').html("");
        password_ok = true;
    }
    //valida el correo si es correcto lo pasa a true
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(email)) {
        $('#error_email').html("");
        email_ok = true;
    } else {
        $('#error_email').html("Error del email.");
    }

    console.log(oto_login_ok + '-' + login_ok + '-' + password_ok + '-' + email_ok);
    if (oto_login_ok && login_ok && password_ok && email_ok) {
        let parametros = {
            'func': 'agregar_anunciantes',
            'busc1': login,
            'busc2': password,
            'busc3': email,
            'busc4': bloqueado
        };
        $.ajax({
            url: 'enviarDato.php',
            method: 'post',
            data: parametros,
            success: function (data) {
                if (data) {
                    listado_administrador();
                    $('#form_agregar_anunciantes').hide();
                    $('#anunciantes_ok').show();
                    $('#anunciantes_ok').hover(function () {
                        $('#anunciantes_ok').hide();
                    });
                }
            },
            error: function (xhr, status) {
                console.log('Disculpe, existió un problema');
            },
            complete: function (xhr, status) {
                //cuando termina resetea la variables
                login_ok = false;
            }
        });
    }
}




function administrador_update() {


    $('#cerrar_formulario_updade').on('click', function () {
        $('#form_update_anunciantes').hide();
    });




    $(document).on('click', '#btn_update_administrador', function () {
        $('#delete_administrador_formulario').hide();
        $('#form_agregar_anunciantes').hide();
        $('#form_update_anunciantes').show();
        //$('#update_anunciante_ok').hide();
        $('#update_anunciante_error').hide();
        $('#update_anunciante_repetido').hide();

        //recuperamos el login que vamos actualizar
        let id_login = $(this).attr('data-cod1');
        //console.log(id_login);
        let parametros = {
            'func': 'update_login',
            'busc': id_login
        };
        $.ajax({
            url: 'enviarDato.php',
            method: 'post',
            data: parametros,
            success: function (data) {
                data = $.parseJSON(data);
                if (data) {
                    //muestra el valor da la tabla anunciantes que vamos a modificar
                    recuperar_update_administrador(data);
                }
            },
            error: function (xhr, status) {
                console.log('Disculpe, existió un problema');
            },
            complete: function (xhr, status) {

            }
        });


        $('#update_login').keyup(function () {
            let login_ok = false;
            let id_login_repetido = $(this).val();
            //console.log(id_login_repetido);
            let parametros1 = {
                'func': 'buscar_login',
                'busc': id_login_repetido
            };

            $.ajax({
                url: 'enviarDato.php',
                method: 'post',
                data: parametros1,
                success: function (data) {
                    data = $.parseJSON(data);
                    //console.log(data);
                    if (data) {
                        $('#error_login_update').html('<p>Login esta repetido</p>');
                        login_ok = false;
                    } else {
                        $('#error_login_update').html('');
                        login_ok = true;
                    }
                    //  console.log(login_ok);
                    pasao_parametro_repetido(login_ok);
                },
                error: function (xhr, status) {
                    console.log('Disculpe, existió un problema');
                }
            })
        }).keyup();
    });

    //funcion que no se utiliza el boolean de login_ok
    function pasao_parametro_repetido(login_ok) {

        // console.log(login_ok);


        //botón actualizar cuando tenemos los nuevos datos en el formulario podemos modificarlos
        $('#update_formulario_anunciantes').on('click', function () {

            //  alert("aqui");
            let update_nuevo_ok = false;
            let update_email_ok = false;
            //recupermos los valores nuevos del formulario para guardar 
            let update_antiguo = $('#update_login_oculto').val();
            let update_nuevo = $('#update_login').val();
            let update_email = $('#update_email').val();
            let update_bloqueado = $('input[name="updateRadios"]:checked').val();

            //validar el login que no este vacío
            if (update_nuevo == "") {
                $('#error_login_update').html('<p>El login no puede estar vacío</p>');
                update_nuevo_ok = false;
            } else {
                $('#error_login_update').html('');
                update_nuevo_ok = true;
            }

            //valida el email si todo es correcto true
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(update_email)) {
                $('#error_email_update').html("");
                update_email_ok = true;
            } else {
                $('#error_email_update').html('<p>Error de email</p>');
                update_email_ok = false;
            }
            console.log(update_nuevo_ok + "- " + update_email_ok);
            if (update_nuevo_ok && update_email_ok) {
                let parametros = {
                    'func': 'insertar_update',
                    'busc1': update_nuevo,
                    'busc2': update_email,
                    'busc3': update_bloqueado,
                    'busc4': update_antiguo
                };
                $.ajax({
                    url: 'enviarDato.php',
                    method: 'post',
                    data: parametros,
                    success: function (data) {
                        // console.log(data);
                        data = $.parseJSON(data);
                        //si devuelve un 0 es que no tiene ningun cambio
                        //   console.log(data);
                        if (data == 0) {
                            $('#update_anunciante_error').show();
                        }
                        //si devuelve un 1 es que hay cambio
                        if (data == 1) {
                            //Función que muestra un listado de la base de datos de todos los anunciantes
                            listado_administrador();
                            $('#form_update_anunciantes').hide();
                            $('#update_anunciante_ok').show();
                            //podemos borrar el mensaje que muestra con hover
                            $('#update_anunciante_ok').hover(function () {
                                $('#update_anunciante_ok').hide();
                            })
                        }
                    },
                    error: function (xhr, status) {
                        console.log('Disculpe, existió un problema');
                    }
                });
            }
        });

    }



}

/**
 * muestra el valor da la tabla anunciantes que vamos a modificar
 * @param {} data array con lo valores de la base de datos del usuario encontrado
 */
function recuperar_update_administrador(data) {
    data.forEach(function (element) {
        //guardar la variable en un  input oculto 
        let login_antiguo = element.login;
        let email = element.email;
        let bloqueado = element.bloqueado;

        $('#update_login_oculto').val(login_antiguo);
        $('#update_login').val(login_antiguo);
        $('#update_email').val(email);

        //mostramos por pantalla el valor del radio button que recuperamos de la base de datos
        if (bloqueado == 0) {
            $('#updateRadios0').prop("checked", true);
        } else if (bloqueado == 1) {
            $('#updateRadios1').prop("checked", true);
        }

        //recuepera el valor del radio buton selecionado codigo no utiilizado
        //$("input[name=updateRadios]").click(function () {
        //alert("La edad seleccionada es: " + $('input:radio[name=edad]:checked').val());
        //console.log("La edad seleccionada es: " + $(this).val());
        //});
    });
}

/**
 * Función para borrar anunciantes que estan registrados
 */
function delete_administrador() {
    let id_autor = "";
    $(document).on('click', '#btn_delete_administrador', function () {
        id_autor = $(this).attr('data-cod2');
        $('#form_update_anunciantes').hide();
        $('#form_agregar_anunciantes').hide();
        $('#delete_administrador_formulario').show();
        $('#confirmado_delete_administrador').hide();

        //muestra por pantalla el usuario que vamos a borrar 
        $('#delete_registro_administrador').html(' ' + id_autor);

    });

    //botón para cerrar el formulario
    $('#cerrar_formulario_delete_administrador').on('click', function () {
        $('#delete_administrador_formulario').hide();
    });

    //botón para confirmar el boorrado del usuario de la tabla  ununciantes
    $('#enviar_delete_administrador').on('click', function () {
        let parametros = {
            'func': 'eliminar_administrador',
            'busc': id_autor
        };
        $.ajax({
            url: 'enviarDato.php',
            method: 'post',
            data: parametros,
            success: function (data) {
                //si todo es correcto borramos el usuario
                //console.log(data);
                //Función que muestra un listado de la base de datos de todos los anunciantes
                listado_administrador();

                $('#delete_administrador_formulario').hide();
                $('#delete_administrador_borrado').show();

                $('#delete_administrador_borrado').hover(function () {
                    $('#delete_administrador_borrado').hide();
                });
            }
        });
    });
}