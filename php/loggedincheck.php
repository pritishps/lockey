<?php 
    session_start();
    $data=[];
    if(isset($_SESSION['email'])){
        $data['status']="success";
        $data['name']=$_SESSION['name'];
    } else{
        $data['status']="error";
    }
    echo json_encode($data);
?>