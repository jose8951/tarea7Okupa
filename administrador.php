<?php

include_once 'partes/cabecera.php';
?>

<body>
    <div class="elcontenedor">
        <!--Muestra el header contiene titulo y el button de añadir-->
        <div class="cabecera fixed-top">
            <div class="btn_cabecera" id="buscar">
                <form>
                    <div><button id="desconexion" class="btn btn-danger" formaction="desconexion.php">Desconexion</button></div>
                </form>
            </div>
            <div class="btn_cabecera">
                <div id="titulo">Alquiler Okupa222</div>
            </div>
            <div class="btn_cabecera" id="insertar">
                <button class="btn_cerrar_invitado btn btn_success" id="btn_agregar_anunciantes">Agregar anunciantes</button>
            </div>
        </div>



        <!--Formulario para agrear anunciantes como administrador-->
        <form id="form_agregar_anunciantes">
            <div class="alert alert-prymayr" role="alert">
                Agregando anunciantes
            </div>

            <div class="row">
                <div id="anunciantes_error" class="alert alert-danger fas fa-times col-md-12"><span> Error al insertar el registro.</span></div>
            </div>

            <div class="form-group">
                <input type="text" id="anunciante_login" class="form-control" value="" aria-describedby="emailHelp" placeholder="Login">
                <small id="error_login" class="form-text text-danger"></small>
            </div>

            <div class="form-group">
                <input type="text" id="anunciante_password" class="form-control" value="" aria-describedby="emailHelp" placeholder="Password">
                <small id="error_password" class="form-text text-danger"></small>
            </div>

            <div class="form-group">
                <input type="text" id="anunciante_email" class="form-control" value="" aria-describedby="emailHelp" placeholder="Email">
                <small id="error_email" class="form-text text-danger"></small>
            </div>

            <!--radio button muestra no bloqueado con el valor 0, por defecto esta checked-->
            <div class="form-check">
                <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="0" checked>
                <label class="form-check-label" for="exampleRadios1">
                    <!--checked-->
                    Anunciantes desbloqueado.
                </label>
            </div>
            <!--radio button muestra bloqueado con el valor 1-->
            <div class="form-check">
                <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="1">
                <label class="form-check-label" for="exampleRadios2">
                    Anunciante bloqueado.
                </label>
            </div>

            <div class="botones_agregar form-group">
                <button type="button" class="btn btn-success" name='guardar' id="guardar_formulario_anunciantes" value=''>Guardar</button>
                <button type="button" class="btn btn-danger" id="cerrar_formulario_anunciantes">Cerrar</button>
            </div>
        </form>

        <!--si todo es correcto muesta un mensaje -->
        <div class="alert alert-success" id="anunciantes_ok" role="alert"><i class="fas fa-check"></i>
            Registro insertado correctamente.
        </div>


        <!--formulario de update del administrador-->
        <form id="form_update_anunciantes">
            <div class="alert alert-primary" role="alert">
                Agregando anunciantes.
            </div>
            <!--"alert alert-danger fas fa-times"-->
            <div id="update_anunciante_error" class="alert alert-danger" role="alert">
                Error no hay cambios para realizar.
            </div>
            <div id="update_anunciante_repetido" class="alert alert-danger" role="alert">
                Usuario esta repetido.
            </div>
            <i class=""></i>
            <div class="form-group">
                <input type="text" id="update_login" class="form-control" value="" aria-describedby="emailHelp" placeholder="Login">
                <input type="hidden" id="update_login_oculto" class="form-control" value="" aria-describedby="emailHelp" placeholder="Login">
                <!--oculto-->
                <small id="error_login_update" class="form-text text-danger"></small>
            </div>
            <div class="form-group">
                <input type="text" id="update_email" class="form-control" value="" aria-describedby="emailHelp" placeholder="Email">
                <small id="error_email_update" class="form-text text-danger"></small>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="radio" name="updateRadios" id="updateRadios0" value="0">
                <label class="form-check-label" for="exampleRadios1">
                    <p class="text-success"> Anunciantes desbloqueado.</p>
                </label>
            </div>
            <div class="form-check">

                <input class="form-check-input" type="radio" name="updateRadios" id="updateRadios1" value="1">
                <label class="form-check-label" for="exampleRadios2">
                    <p class="text-danger"> Anunciante bloqueado.</p>
                </label>
            </div>

            <div class="botones_update form-group">
                <button type="button" class="btn btn-success" name='guardar' id="update_formulario_anunciantes" value=''>Update</button>
                <button type="button" class="btn btn-danger" id="cerrar_formulario_updade">Cerrar</button>
                <!-- <button type="submit" class="btn btn-primary" formaction="administrador.php?var1=val1&var2=val2">Administrador</button>-->
            </div>
        </form>
        <!--si todo es correcto muesta un mensaje -->
        <div id="update_anunciante_ok" class="alert alert-success" role="alert"><i class="fas fa-check"></i>
            Registro actualizado correctamente.
        </div>

        <!--formulario para borrar los usuario creados por el administrador-->
        <form id="delete_administrador_formulario">
            <div class="alert alert-primary" role="alert">
                Formulario de registro de borrado.
            </div>
            <div><span class='error' id="error_administrador"></span></div>

            <div class="alert alert-danger" id="delete_pregunta_administrador" role="alert">¿Quieres borrar el registro?<span id="delete_registro_administrador"> </span></div>
            <div class="botones_delete form-group">
                <button type="button" class="btn btn-success" name='enviar' id="enviar_delete_administrador" value=''>Delete</button>
                <button type="button" class="btn btn-danger" id="cerrar_formulario_delete_administrador">Cerrar</button>
            </div>
        </form>



        <!--si todo es correcto muesta un mensaje -->
        <div class="alert alert-success" id="delete_administrador_borrado" role="alert"><i class="fas fa-check"></i>
            Registro borrado ok
        </div>

        <!--la tabla3 muestra un listado de los anunciantes que estan bloqueado o desbloqueados-->
        <div class="tabla_administrador" id="tabla3"></div>
    </div>
</body>

</html>