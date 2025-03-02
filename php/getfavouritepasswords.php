<?php
    require_once "connection.php";
    session_start();
    $email =$_SESSION['email'];
    try{
        $qry = "SELECT * FROM passwords WHERE email=? and favourite='yes'";
        $stmt = $conn->prepare($qry);
        $stmt->bind_param("s",$email);
        $stmt->execute();
        $result = $stmt->get_result();
        $data = $result->fetch_all(MYSQLI_ASSOC);
        echo json_encode($data);
    } catch (Exception $e){
        die($conn->error);
    } finally{
        $conn->close();
    }
?>