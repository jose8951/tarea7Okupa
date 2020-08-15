<?php
session_start();
include_once 'partes/cabecera.php';
?>

<body>
    <div class="elcontenedor">
        <!--Muestra el header contiene el buscador, titulo y el button de añadir-->
        <div class="cabecera">
            <div class="btn_cabecera" id="buscar">
                <form>
                    <!--boton para la desconexión del administrador-->
                    <div><button id="desconexion" class="btn btn-primary" formaction="administrador.php">Administrador</button></div>
                </form>
            </div>
            <div class="btn_cabecera">
                <div id="titulo">Alquiler Okupa2</div>
            </div>
            <div class="btn_cabecera" id="insertar">
               <button class="btn_cerrar_invitado btn btn_success" id="btn_login_arriba">Login invitado</button>
            </div>
        </div>

        <div class="tabla" id="tabla"></div>



        <!--Formulario login de invitado cuando introducimos el login y el passoword-->
        <form id="login_invitado_arriba" name="formulario_invitado">
            <div class="alert alert-primary" role="alert">
                Ingreso del invitado.
            </div>
            <div class="alert alert-danger" id="error_login_arriba" role="alert">
                Invitado no encontrado en la base de datos.
            </div>
            <div class="alert alert-danger" id="error_login_arriba_bloqueado" role="alert">
                Invitado esta bloqueado.
            </div>
            <div class="form-group">
                <input type="text" class="form-control" name="usuario" id="invitado_login_arriba" value="" aria-describedby="emailHelp" placeholder="Login">
                <!-- <input type="text" id='otro'>-->
                <small id="error_invitado_arriba" class="form-text text-danger"></small>
            </div>
            <div class="form-group">
                <input type="password" class="form-control" name="password" id="invitado_password_arriba" value="" placeholder="Password">
                <small id="error_password_arriba" class="form-text  text-danger"></small>
            </div>
            <div class="botones_login_arriba form-group">
                <button type="button" class="btn btn-success" name='enviar' id="enviar_invitado_arriba" value=''>Enviar</button>
                <button type="button" class="btn btn-danger" id="cerrar_invitado_arriba">Cerrar</button>
            </div>
        </form>


        <!--formulario de datos de entrada de los anuncios-->
        <form id="formulario_invitado_arriba">
            <div class="alert alert-primary" role="alert">
                Formulario de datos del anuncio.
            </div>
            <div><span class='error' id="error_login"></span></div>
            <div class="form-group">
                <input type="text" id="arriba_autor" class="sin_borde" value="" placeholder="Autor" readonly>
                <!-- <div id="arriba_autor"></div>-->
                <small id="error_autor" class="form-text text-danger"></small>
            </div>
            <div class="form-group">
                <input type="text" class="form-control" id="arriba_moroso" value="" placeholder="Moroso">
                <small id="error_moroso" class="form-text text-danger"></small>
            </div>
            <div class="form-group">
                <input type="text" class="form-control" id="arriba_localidad" value="" placeholder="Localidad">
                <small id="error_localidad" class="form-text text-danger"></small>
            </div>
            <div class="form-group">
                <input type="text" class="form-control" id="arriba_descripcion" value="" placeholder="Descripción">
                <small id="error_descripcion" class="form-text text-danger"></small>
            </div>
            <div class="form-group">
                <input type="date" class="form-control" id="arriba_fecha" value="" placeholder="Fecha">
                <small id="error_fecha" class="form-text text-danger"></small>
            </div>
            <div class="botones_login form-group">
                <button type="button" class="btn btn-success" name='enviar' id="enviar_agregar_arriba" value=''>Agregar</button>
                <button type="button" class="btn btn-danger" id="cerrar_formulario_arriba">Cerrar</button>
            </div>
        </form>

        <!--Formulario login para el invitado cuando solo introducimos el password-->
        <form id="login_invitado_mostrar" name="formulario_invitado" action="invitado_ok.php" method="POST">
            <div class="titulo_login">Invitado login</div>
            <div class="alert alert-danger" id="login_invitado_incorrecto" role="alert">
                Password incorrecto.
            </div>
  
            <div id="error_login_invitado" class='codigo_error alert alert-danger'><i class='fas fa-times'></i><span>Usuario esta bloqueado.</span></div>
            <div class="form-group">
                <label>Login de invitado</label>
                <input type="text" class="form-control" name="usuario" id="invitado_login" value="" aria-describedby="emailHelp" readonly>
                <!--recuperamos el valor de invitado y lo guardamos oculto. tambien el name por-->
                <input type="hidden" id="login_invitado" name="login_invitado_" value="">
                <small id="error_invitado" class="form-text text-danger"></small>
            </div>
            <div class="form-group">
                <label>Password</label>
                <input type="password" class="form-control" name="password" id="invitado_password" value="" placeholder="Password">
                <small id="error_password" class="form-text  text-danger"></small>
            </div>

            <div class="botones_login form-group">
                <button type="button" class="btn btn-success" name='enviar' id="enviar_login_invitado" value=''>Enviar</button>
                <button type="button" class="btn btn-danger" id="cerrar_formulario_invitado">Cerrar</button>
            </div>
        </form>





        <!--mensaje ok cuando el usuario se ha registrado correctamente-->
        <div class="alert alert-success" id="anuncio_arriba_ok" role="alert"><i class="fas fa-check"></i>
            Anuncio ingreso correctamente
        </div>

    </div>
</body>

</html>