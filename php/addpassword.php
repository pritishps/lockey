<?php
    require_once "connection.php";
    session_start();
    $email = $_SESSION['email'];
    $name = $_POST['name'];
    $url = $_POST['url'];
    $password = $_POST['password'];
    $username = $_POST['username'];
    $note = $_POST['note'];
    $favourite = $_POST['favourite'];
    try{
        $qry = "INSERT INTO passwords(email,name,url,password,username,note,favourite) VALUES(?,?,?,?,?,?,?)";
        $stmt = $conn->prepare($qry);
        $stmt->bind_param("sssssss",$email,$name,$url,$password,$username,$note,$favourite);
        $status = $stmt->execute();
        $data=[];
        if($status){
            $data['status']='success';
        } else{
            $data['status']=='error';
        }
        echo json_encode($data);
        
    } catch (Exception $e){
        die($conn->error);
    } finally{
        $conn->close();
    }
?>