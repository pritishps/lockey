<?php
    require_once "connection.php";
    session_start();
    if(isset($_SESSION['email'])){
        $email = $_SESSION['email'];
        if(isset($_POST['updated-register'])){
            $id = $_POST['updated-id'];
            $name = $_POST['updated-app-name'];
            $url = $_POST['updated-url'];
            $password = $_POST['updated-encrypted_password'];
            $username = $_POST['updated-username'];
            $note = $_POST['updated-note'];
            if(isset($_POST['updated-favourite'])){
                $favourite='yes';
            }else{
                $favourite="no";
            }
            

            try{
                $qry = "UPDATE passwords set email=?,name=?,url=?,password=?,username=?,note=?,favourite=? WHERE id=?";
                $stmt = $conn->prepare($qry);
                $stmt->bind_param("sssssssi",$email,$name,$url,$password,$username,$note,$favourite,$id);
                $status = $stmt->execute();
                $data=[];
                if($status){
                    header("location:./../html/home.html");
                } else{
                    $data['status']=='error';
                }
                
            } catch (Exception $e){
                die($conn->error);
            } finally{
                $conn->close();
            }
        }
        else{
            header("location:./../html/home.html");
        }
    } else{
        header("location:./../html/login.html");
    }
?>