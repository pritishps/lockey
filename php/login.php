<?php
    require_once "connection.php";
    $email = $_POST['email'];
    $password = $_POST['password'];
    try{
        $qry = "SELECT * FROM users WHERE email=?";
        $stmt = $conn->prepare($qry);
        $stmt->bind_param("s",$email);
        $stmt->execute();
        $result = $stmt->get_result();
        $data=[];
        if($result->num_rows>0){
            $rs = $result->fetch_assoc();
            if($rs['password']!= $password){
                $data['status']='error';
                $data['invalid']='password';
            } else{
                $data['status']="success";
                session_start();
                $_SESSION['email']=$email;
                $_SESSION['name']=$rs['first_name'];
            }
        } else{
            $data['status']="error";
            $data['invalid']="email";
        }
        echo json_encode($data);
    } catch (Exception $e){
        die($conn->error);
    } finally{
        $conn->close();
    }
?>