<?php
include_once 'partes/cabecera.php';
session_start();
?>


<body>
    <div class="elcontenedor">
        <!--elcontenedor   container-->
        <!--Muestra el header titulo y el button de añadir-->
        <div class="cabecera">
            <div class="btn_cabecera" id="buscar">
                <form>
                    <!--botón de desconexion-->
                    <div><button id="desconexion" class="btn btn-danger" formaction="desconexion.php">Desconexion</button></div>
                </form>
            </div>

            <div class="btn_cabecera">
                <div id="titulo">Alquiler Okupa2</div>
            </div>
            <div class="btn_cabecera" id="insertar">
                <button class="btn_cerrar_invitado btn btn-success" id="btn_login_invitado">Agregar anuncios</button>
            </div>
        </div>

        <!--si el usuario esta registrado creamos la session y la guardamos-->
        <div class="usuario_registrado">
            <?php
            if (isset($_REQUEST['login_invitado_'])) {
                //echo $_REQUEST['login_invitado_'];
                //creamos la session usuairo y la guardamos
                $_SESSION['usuario'] = $_REQUEST['login_invitado_'];
                // echo $_SESSION['usuario'];
                $_SESSION['hora'] = date('H:i:s');
                echo '<span id="mirar_invitado">Usuario Registrado: </span>' . $_SESSION['usuario'];
                echo '<span> Hora: </span>' . $_SESSION['hora'];
            }
            ?>
        </div>

        <!--tabla que muestra un listado de los anuncios-->
        <div class="tabla" id="tabla1"></div>
        <button class="oculta_boton" id="invitado_login_ok" value="<?php if ($_SESSION['usuario']) echo $_SESSION['usuario']; ?>">
        </button>

        <!--formulario para agregar anucios con el usuario registrado -->
        <form id="agregar_anuncios_formulario">
            <div class="titulo_login">Autor del anuncio: <span id="anunciante_registrado"></span></div>
            <div><span class='error' id="error_login"></span></div>
            <!-- <div class="form-group"> -->
            <div class="form-group">
                <input type="text" class="form-control form-control-warning" id="agregar_moroso" value="" placeholder="Moroso">
                <small id="error_moroso" class="form-text text-danger"></small>
            </div>
            <div class="form-group">
                <input type="text" class="form-control" id="agregar_localidad" value="" placeholder="Localidad">
                <small id="error_localidad" class="form-text text-danger"></small>
            </div>
            <div class="form-group">
                <input type="text" class="form-control" id="agregar_descripcion" value="" placeholder="Descripción">
                <small id="error_descripcion" class="form-text text-danger"></small>
            </div>

            <div class="form-group">
                <input type="date" class="form-control" id="agregar_fecha" value="" placeholder="Fecha">
                <small id="error_fecha" class="form-text text-danger"></small>
            </div>
            <div class="botones_login form-group">
                <button type="button" class="btn btn-success" name='enviar' id="enviar_agregar" value=''>Agregar</button>
                <button type="button" class="btn btn-danger" id="cerrar_formulario_agregar">Cerrar</button>
            </div>
        </form>

        <!-- Si todo es correcto muestra por pantanlla mensaje ok-->
        <div class="alert alert-success" id="agregado_anuncio_correctamente" role="alert"><i class="fas fa-check"></i>
            Anuncio creado correctamente
        </div>


        <!--formulario para borrar registros -->
        <form id="delete_anuncios_formulario">
            <div class="alert alert-primary" role="alert" id="delete_anuncio_ok">
                Formulario de registro de borrado.
            </div>
            <div><span class='error' id="error_login"></span></div>
            <span id="delete_registro_borrado">
                <div class="alert alert-success" role="alert">"Registro borrado ok"</div>
            </span>
            <div class="alert alert-danger" id="delete_pregunta" role="alert">¿Quieres borrar el registro? <span id="delete_registro"></span></div>
            <div class="botones_delete form-group">
                <button type="button" class="btn btn-success" name='enviar' id="enviar_delete" value=''>Delete</button>
                <button type="button" class="btn btn-danger" id="cerrar_formulario_delete">Cerrar</button>
            </div>
        </form>

        <!--forumlario de de usuario update-->
        <form id="update_anuncios_formulario">
            <div class="titulo_login">Autor del anuncio<span id="update_titulo"></span></div>
            <div><span class='error' id="error_login"></span></div>
            <div class="alert alert-danger" id="update_repetido_oculto" role="alert">
                No hay cambios que guardar.
            </div>
            <div class="form-group">
                <input type="hidden" id="update_id_anuncio">
                <input type="text" class="form-control" id="update_autor" value="" placeholder="Autor" readonly>
                
                <small id="error_autor_up" class="form-text text-danger"></small>
            </div>

            <div class="form-group">
                <input type="text" class="form-control" id="update_moroso" value="" placeholder="Moroso">
                <small id="error_moroso_up" class="form-text text-danger"></small>
            </div>
            <div class="form-group">
                <input type="text" class="form-control" id="update_localidad" value="" placeholder="Localidad">
                <small id="error_localidad_up" class="form-text text-danger"></small>
            </div>
            <div class="form-group">
                <input type="text" class="form-control" id="update_descripcion" value="" placeholder="Descripción">
                <small id="error_descripcion_up" class="form-text text-danger"></small>
            </div>
            <div class="form-group">
                <input type="date" class="form-control" id="update_fecha" value="" placeholder="Fecha">
                <small id="error_fecha_up" class="form-text text-danger"></small>
            </div>
            <div class="botones_login form-group">
                <button type="button" class="btn btn-success" name='enviar' id="enviar_update" value=''>Agregar</button>
                <button type="button" class="btn btn-danger" id="cerrar_formulario_update">Cerrar</button>
            </div>
        </form>

        <!--si todo correcto con el update de usuario-->
        <div class="alert alert-success" id="cuando_update_ok" role="alert"><i class="fas fa-check"></i>
            La actualización fue correcta.
        </div>


    </div>
</body>

</html>