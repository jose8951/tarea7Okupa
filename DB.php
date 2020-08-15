<?php
//Datos para conexión a la base de datos
define('DB_HOST', 'mysql:host=localhost;dbname=morosos');
define('DB_USER', 'dwes');
define('DB_PASS', 'abc123.');

class DB
{
    private static $instancia;
    private $con;

    /**
     * Constructor a la base de datos
     */
    private function __construct()
    {
        try {
            $this->con = new PDO(DB_HOST, DB_USER, DB_PASS);
            $this->con->exec('set names utf8');
            //si tenemos un error a la base de datos
            $this->con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            //Exception a la la base de datos
            die('<p>No se ha conectado a la DB </p>' . $e->getMessage());
        }
    }

    /**
     * Método estático que devuelve la conexión a la base de datos. En caso de
     * no haberse realizado la conexión se instancia el constructor a si mismo.
     * En el caso de haber sido ya instanciada devuelve el valor de la instancia
     * @return Objeto
     */
    private static function conexion()
    {
        if (!isset(self::$instancia)) {
            self::$instancia = new DB;
        }
    }

    /**
     * Devuelve la consulta preparada
     * $sql es la consulta 
     */
    private static function prepare($sql)
    {
        return self::$instancia->con->prepare($sql);
    }

    /**
     * función para listar la base de datos de anuncios ordenados por fecha   
     */
    public static function listarEscaparate()
    {
        //recuperamos la conexión
        self::conexion();
        $sql = "SELECT * FROM anuncios ORDER BY id_anuncio DESC";
        try {
            //llamamos a la preparacion de la consulta

            $resultado = self::prepare($sql);
            //$resultado->bindParam(1,$nombre);
            $resultado->execute();
            $aux = $resultado->fetchAll(PDO::FETCH_ASSOC);
            //si no esta vacío devuelve un array con los datos
            if (!empty($aux)) {
                return $aux;
            } else {
                return false;
            }
        } catch (PDOException $e) {
            echo 'Error en la conexion ' . $e->getMessage();
        }
    }


    /**
     * Función para listar los anunciantes
     */
    public static function listarAnuncios()
    {
        self::conexion();
        try {
            $sql = "SELECT * FROM anunciantes";
            $resultado = self::prepare($sql);
            $resultado->execute();
            $aux = $resultado->fetchAll(PDO::FETCH_ASSOC);
            if (!empty($aux)) {
                return $aux;
            } else {
                return false;
            }
        } catch (PDOException $e) {
            echo "error en la conexión  " . $e->getMessage();
        }
    }

    /**
     * Función para comprobar si un invitado tiene permisos de entrada, 
     * con la entrada de parametros login y password.  Devuelve el campo bloqueado
     */
    public static function validarLoginInvitado($login, $password)
    {
        self::conexion();
        $sql = "SELECT * FROM anunciantes WHERE login=?";
        try {
            $resultado = self::prepare($sql);
            $resultado->bindParam(1, $login);
            //$resultado->bindParam(2,$password);
            $resultado->execute();
            $rows = $resultado->fetch(PDO::FETCH_ASSOC);
            // Verificar si la contraseña coincide
            if (password_verify($password, $rows['password'])) {
                return $rows['bloqueado'];
            } else {
                return 'error';
            }
        } catch (PDOException $e) {
            echo "Error en la conexion. " . $e->getMessage();
        }
    }


    public static function anuncios_insertados($autor, $moroso, $localidad, $descripcion, $fecha)
    {
        self::conexion();
        $sql = "INSERT INTO anuncios (autor, moroso, localidad, descripcion, fecha) VALUES (?,?,?,?,?)";
        try {
            //llamamos a la preparacion de la consulta 
            $resultado = self::prepare($sql);
            //introducimos los correspondientes parametros de la consulta
            $resultado->bindParam(1, $autor);
            $resultado->bindParam(2, $moroso);
            $resultado->bindparam(3, $localidad);
            $resultado->bindParam(4, $descripcion);
            $resultado->bindParam(5, $fecha);
            $resultado->execute();
            //devuelve true si todo es correcto
            return true;
        } catch (PDOException $e) {
            echo "Se ha producico un error: El mensaje de error es: " . $e->getMessage();
        }
        return false;
    }


    public static function listar_invitado_personal($id_Autor)
    {
        //recuperamos la conexión
        self::conexion();
        $sql = "SELECT * FROM anuncios WHERE autor=? ORDER BY fecha DESC";
        try {
            $resultado = self::prepare($sql);
            $resultado->bindParam(1, $id_Autor);
            $resultado->execute();
            $rows = $resultado->fetchAll(PDO::FETCH_ASSOC);
            if (!empty($rows)) {
                return $rows;
            } else {
                return false;
            }
        } catch (PDOException $e) {
            echo "Error en la conexión " . $e->getMessage();
        }
    }

    public static function update_invitado($up_id_anuncio)
    {
        self::conexion();
        $sql = "SELECT * FROM anuncios WHERE id_anuncio=?";
        try {
            $resultado = self::prepare($sql);
            $resultado->bindparam(1, $up_id_anuncio);
            $resultado->execute();
            $aux = $resultado->fetch(PDO::FETCH_ASSOC);
            if (!empty($aux)) {
                return $aux;
            } else {
                return false;
            }
        } catch (PDOException $e) {
            echo "Error en la conexión " . $e->getMessage();
        }
    }

    public static function update_anuncios_guardar($up_ID, $up_moroso, $up_localidad, $up_descripcion, $up_fecha)
    {
        self::conexion();
        $sql = "UPDATE anuncios SET moroso=?, localidad=?, descripcion=?, fecha=? WHERE id_anuncio=?";
        try {
            $resultado = self::prepare($sql);
            $resultado->bindParam(1, $up_moroso);
            $resultado->bindParam(2, $up_localidad);
            $resultado->bindParam(3, $up_descripcion);
            $resultado->bindParam(4, $up_fecha);
            $resultado->bindParam(5, $up_ID);
            $resultado->execute();
            //Si todo es correcto devuelve 1, si no devuelve 0 
            return $resultado->rowCount();
        } catch (PDOException $e) {
            echo "Error en la conexion " . $e->getMessage();
        }
    }

    public static function eliminar($id_anuncio)
    {
        self::conexion();
        $sql = "DELETE FROM anuncios WHERE id_anuncio=?";
        try {
            //llamamos a la preparacion de la consulta 
            $resultado = self::prepare($sql);
            $resultado->bindParam(1, $id_anuncio);
            $resultado->execute();
            //cuando borra devuelve 1 si no encuentra nada devuelve 0
            return $resultado->rowCount();
        } catch (PDOException $e) {
            echo "Se ha producido un error: El mensaje de error es: " . $e->getMessage();
        }
    }

    public static function insertar_anunciantes($login, $password, $email, $bloqueado)
    {
        self::conexion();
        $sql = "INSERT INTO anunciantes (login,password,email,bloqueado) VALUES (?,?,?,?)";
        //crea un nuevo hash de contraseña usando un algoritmo de hash fuerte de único sentido
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);
        try {
            $resultado = self::prepare($sql);
            $resultado->bindParam(1, $login);
            $resultado->bindParam(2, $hashed_password);
            $resultado->bindParam(3, $email);
            $resultado->bindParam(4, $bloqueado);
            $resultado->execute();
            if ($resultado->rowCount()) {
                return true;
            } else {
                return false;
            }
        } catch (PDOException $e) {
            echo "Se ha producido un error: El mensaje de error es: " . $e->getMessage();
        }
    }

    public static function buscar_login($login)
    {
        self::conexion();
        $sql = "SELECT * FROM anunciantes WHERE login=?";
        try {
            $resultado = self::prepare($sql);
            $resultado->bindParam(1, $login);
            $resultado->execute();
            $aux = $resultado->fetch(PDO::FETCH_ASSOC);
            if (!empty($aux)) {
                return $aux['login'];
            } else {
                return false;
            }
        } catch (PDOException $e) {
            echo "Error en la conexión " . $e->getMessage();
        }
    }

    public static function update_administrador($update_login)
    {
        self::conexion();
        $sql = "SELECT * FROM anunciantes WHERE login=?";
        try {
            $resultado = self::prepare($sql);
            $resultado->bindParam(1, $update_login);
            $resultado->execute();
            $aux = $resultado->fetchAll(PDO::FETCH_ASSOC);
            if (!empty($aux)) {
                return $aux;
            } else {
                return 'error';
            }
        } catch (PDOException $e) {
            echo "Error en la conexión " . $e->getMessage();
        }
    }
    /**
     * Función para actualizar los datos de la tabla anunciantes
     */
    public static function insertar_update($up_login, $up_email, $up_bloqueado, $up_login_antiguo)
    {

        self::conexion();
        $sql = "UPDATE anunciantes SET login=?, email=?, bloqueado=? WHERE login=?";
        try {
            $resultado = self::prepare($sql);
            $resultado->bindParam(1, $up_login);
            $resultado->bindParam(2, $up_email);
            $resultado->bindParam(3, $up_bloqueado);
            $resultado->bindParam(4, $up_login_antiguo);
            $resultado->execute();
            //Si todo es correcto devuelve 1, si no devuelve 0  
            return $resultado->rowCount();
        } catch (PDOException $e) {
            echo "Error en la conexión " . $e->getMessage();
        }
    }

    public static function delete_administrador($delete)
    {
        self::conexion();
        $sql = "DELETE FROM anunciantes WHERE login=?";
        try {
            $resultado = self::prepare($sql);
            $resultado->bindParam(1, $delete);
            $resultado->execute();
            //si devuelve 1 fue borrado, si devuelve 0 no encontrado
            return $resultado->rowCount();
        } catch (PDOException $e) {
            echo "Error en la conexión " . $e->getMessage();
        }
    }
}


//$a=DB::insertar_update('nuevo','a@a.com',1,'nuevo');
//var_dump($a);

/*
$a=DB::listar_invitado_personal('usu1');
var_dump($a);
*/
/*
$a= DB::anuncios_insertados('tonot','pepe','málaga','datos paa el ','2020/10/05');
var_dump($a);
*/

/*
$a=DB::validarLoginInvitado('usu3','usu3');
var_dump($a);
*/
/*
$a=DB::listarAnuncios();
var_dump($a);
*/
/*
$a = DB::listarEscaparate();
var_dump($a);
*/