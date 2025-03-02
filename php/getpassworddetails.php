<?php
    require_once "connection.php";
    session_start();
    $id = $_POST['id'];
    $email =$_SESSION['email'];
    try{
        $qry = "SELECT * FROM passwords WHERE email=? and id=?";
        $stmt = $conn->prepare($qry);
        $stmt->bind_param("si",$email,$id);
        $stmt->execute();
        $result = $stmt->get_result();
        if($result->num_rows==1){
            $data['status']='success';
            $data['data']=$result->fetch_assoc();
        }else{
            $data['status']='error';
        }
        echo json_encode($data);
    } catch (Exception $e){
        die($conn->error);
    } finally{
        $conn->close();
    }
?>