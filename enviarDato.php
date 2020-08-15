<?php

include_once 'DB.php';
//Comprobamos que exista la variable func

if (filter_has_var(INPUT_POST, 'func')) {
    $func = filter_input(INPUT_POST, 'func');
    switch ($func) {

        case 'escaparate':
            //listado del escaparate de la tabla anuncios
            $resultado = DB::listarEscaparate();
            echo json_encode($resultado);
            break;

        case 'listar_anunciantes':
            $resultado = DB::listarAnuncios();
            echo json_encode($resultado);
            break;

        case 'invitado_login';
            $usuario = filter_input(INPUT_POST, 'busc1');
            $password = filter_input(INPUT_POST, 'busc2');
            $resultado = DB::validarLoginInvitado($usuario, $password);
            echo json_encode($resultado);
            break;

        case 'agregar_anuncios':
            $autor = filter_input(INPUT_POST, 'busc1');
            $moroso = filter_input(INPUT_POST, 'busc2');
            $localidad = filter_input(INPUT_POST, 'busc3');
            $descripcion = filter_input(INPUT_POST, 'busc4');
            $fecha = filter_input(INPUT_POST, 'busc5');
            $resultado = DB::anuncios_insertados($autor, $moroso, $localidad, $descripcion, $fecha);
            echo json_encode($resultado);
            break;

        case 'invitado_login':
            $usuario = filter_input(INPUT_POST, 'busc1');
            $password = filter_input(INPUT_POST, 'busc2');
            $resultado = DB::validarLoginInvitado($usuario, $password);
            echo json_encode($resultado);
            break;

        case 'listar_invitado':
            $id_Autor = filter_input(INPUT_POST, 'busc1');
            $resultado = DB::listar_invitado_personal($id_Autor);
            echo json_encode($resultado);
            break;

            //recupera los valores de la base de datos por id 
            //los muestra por pantalla
        case 'update_usuario':
            $up_id_anuncio = filter_input(INPUT_POST, 'busc');
            $resultado = DB::update_invitado($up_id_anuncio);
            echo json_encode($resultado);
            break;

        case 'update_invitado_guardar':
            $up_ID = filter_input(INPUT_POST, 'busc1');
            $up_moroso = filter_input(INPUT_POST, 'busc2');
            $up_localidad = filter_input(INPUT_POST, 'busc3');
            $up_descripcion = filter_input(INPUT_POST, 'busc4');
            $up_fecha = filter_input(INPUT_POST, 'busc5');
            $resultado = DB::update_anuncios_guardar($up_ID, $up_moroso, $up_localidad, $up_descripcion, $up_fecha);
            echo json_encode($resultado);
            break;

        case 'eliminar':
            $id_anuncio = filter_input(INPUT_POST, 'busc');
            $resultado = DB::eliminar($id_anuncio);
            echo json_encode($resultado);
            break;

        case 'agregar_anunciantes':
            $login = filter_input(INPUT_POST, 'busc1');
            $password = filter_input(INPUT_POST, 'busc2');
            $email = filter_input(INPUT_POST, 'busc3');
            $bloqueado = filter_input(INPUT_POST, 'busc4');
            $resultado = DB::insertar_anunciantes($login, $password, $email, $bloqueado);
            echo json_encode($resultado);
            break;

        case 'buscar_login':
            $login = filter_input(INPUT_POST, 'busc');
            $resultado = DB::buscar_login($login);
            echo json_encode($resultado);
            break;

        case 'update_login':
            $update_login = filter_input(INPUT_POST, 'busc');
            $resultado = DB::update_administrador($update_login);
            echo json_encode($resultado);
            break;

        case 'insertar_update':
            $up_login = filter_input(INPUT_POST, 'busc1');
            $up_email = filter_input(INPUT_POST, 'busc2');
            $up_bloqueado = filter_input(INPUT_POST, 'busc3');
            $up_login_antiguo = filter_input(INPUT_POST, 'busc4');
            $resultado = DB::insertar_update($up_login, $up_email, $up_bloqueado, $up_login_antiguo);
            echo json_encode($resultado);

        case 'eliminar_administrador':
            $delete_adm = filter_input(INPUT_POST, 'busc');
            $resultado = DB::delete_administrador($delete_adm);
            echo json_encode($resultado);
            break;
    }
}
