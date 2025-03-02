<?php 
    require_once "connection.php";
    if(isset($_POST['email'])){
        $email = $_POST['email'];
        $otp=$_POST['otp'];
        try{
            $qry = "SELECT * FROM users WHERE email=?";
            $stmt = $conn->prepare($qry);
            $stmt->bind_param("s",$email);
            $stmt->execute();
            $result = $stmt->get_result();
            $data=[];
            $data['status'] = "error";
            if($result->num_rows>0){
                $data['status'] = "error";
                $data['message'] = "Email is already in use";
            } else{
                require_once "sendOTP.php";
                $msg=sendOTP($email,$otp);
                if ($msg=="success"){
                    $data["status"] = "success";
                }else{
                    $data["status"] = "error";
                }
            }
        } catch (Exception $e){
            die($conn->error);
        } finally{
            echo json_encode($data);
        }
    }
?>