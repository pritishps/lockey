<?php
    require_once "connection.php";
    $id = $_POST['id'];
    try{
        $qry = "DELETE FROM passwords WHERE id=?";
        $stmt = $conn->prepare($qry);
        $stmt->bind_param("i",$id);
        $res=$stmt->execute();
        if(!$res){
            $data['status']='server error';
        }
        else if($conn->affected_rows == 1){
            $data['status']='success';
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