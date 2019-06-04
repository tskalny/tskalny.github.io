<?php

	$level_icons = "icons";

	$level_projects = "projects";

	$level_banners = "banners";
	
	$level_limited = "limited";

	

	$sort = $_GET['s'];

	$sortd = $_GET['d'];

	

	function readLevel($level0) { 

		global $sort, $sortd;

		

		$fl = array();

		$db = array();

		

		if (is_dir($level0)) { 

			if ($handler0 = opendir($level0)) { 

				while (($level1 = readdir($handler0)) !== false) { 

					if (is_dir($level0."/".$level1) && $level1 != "" && $level1 != "." && $level1 != ".." && $level1 != "_index") { 

						$db[$level1] = array();

						$db[$level1]["meta"] = getMeta($level0."/".$level1."/meta.txt", $level1);

						$db[$level1]["path"] = $level0."/".$level1;

						$db[$level1]["archive"] = getArchive($level0."/".$level1."/zip.zip");

						$db[$level1]["drafts"] = getDraft($level0."/".$level1."/drafts");

						

						$fl[$level1] = $level1;

						

						if ($handler1 = opendir($level0."/".$level1)) { 

							$fl[$level1] = array();

							

							while (($level2 = readdir($handler1)) !== false) {

								if (is_dir($level0."/".$level1."/".$level2) && $level2 != "" && $level2 != "." && $level2 != ".." && $level2 != "drafts") { 

									$db[$level1][$level2] = array();

									$db[$level1][$level2]["meta"] = $level2;

									$db[$level1][$level2]["path"] = $level0."/".$level1."/".$level2;

								

									$fl[$level1][$level2] = $level2;

								}

							}

						}

						

						ksort($fl[$level1]);

					}

				}

			}

		}

		

		krsort($fl);

		

		showData($fl, $db);

	}

	

	

	function getArchive($filePath) {

		if (is_file($filePath)) { 

			$data = true;

		} else {

			$data = false;

		}

		

		return $data;

	}

	

	function getDraft($filePath) {

		if (is_dir($filePath)) { 

			$data = true;

		} else {

			$data = false;

		}

		

		return $data;

	}

	

	function getMeta($filePath, $fileName) {

		if (is_file($filePath)) { 

			$date = explode("_", $fileName);

			$file = file($filePath);

			

			$data = explode("|", $file[1]);

			$data[2] = $date[0];

		} else {

			$data = array("Undefined", "UN", "2000.00"); 

		}

		

		return $data;

	}

	

	function showData($fl, $db) {
		
		// Read from file
		$status_f = "status.txt";
		if (!file_exists($status_f)) {
			fopen($status_f, 'w+');
			$s_all = array();
		} else {
			if(filesize($status_f) != "0") {
				$status_open = fopen($status_f, 'r');
				$status_all = fread($status_open, filesize($status_f));
				fclose($status_open);
				if(!empty($status_all)) {
					$s_all = explode("|", $status_all);
				}
			} else { $s_all = array(); }
		}
		
				
	// Read from file
		$status_f2 = "status2.txt";
		if (!file_exists($status_f2)) {
			fopen($status_f2, 'w+');
			$s_all2 = array();
		} else {
			if(filesize($status_f2) != "0") {
				$status_open2 = fopen($status_f2, 'r');
				$status_all2 = fread($status_open2, filesize($status_f2));
				fclose($status_open2);
				if(!empty($status_all2)) {
					$s_all2 = explode("|", $status_all2);
				}
			} else { $s_all2 = array(); }
		}
		
		
		
			$count = 0;
		foreach ($fl as $keys => $value) {
				if (in_array($db[$keys]["path"], $s_all)) {
				$status = 'checked="checked"';
			}
			else { 
				$status = '';
			}
			
			
			if (in_array($db[$keys]["path"], $s_all2)) {
				$status2 = 'checked="checked"';
			}
			else { 
				$status2 = '';
			}
			

			

			

			echo "<tr>\n";

			echo "	<td class=\"project\">";

			echo $db[$keys]["meta"][0]."</td><td rowspan=\"2\" class=\"date\">".$db[$keys]["meta"][2]."</td><td rowspan=\"2\" class=\"checkbox\"><input type='checkbox' name='status[]' value='".$db[$keys]["path"]."' ".$status." /></td><td rowspan=\"2\" class=\"checkbox\"><input type='checkbox' name='status2[]' value='".$db[$keys]["path"]."' ".$status2." /></td><td rowspan=\"2\" class=\"creator\">".$db[$keys]["meta"][1];

			echo "	</td>\n";

			echo "</tr>\n";

			echo "<tr>\n";

			echo "	<td class=\"options\">";

			if ($db[$keys]["drafts"] == true) echo "<a href=\"".$db[$keys]["path"]."/drafts\" target=\"_blank\" class=\"lnkSmall\">Drafts</a>"; 

			foreach ($value as $key => $value) {

				echo "<a href=\"".$db[$keys][$key]["path"]."\" target=\"_blank\" class=\"lnkSmall\">".$db[$keys][$key]["meta"]."</a>";

				//echo "<a href=\"show.php?name=".$db[$keys]["meta"][0]."&type=".$db[$keys][$key]["meta"]."&path=".$db[$keys][$key]["path"]."\" target=\"_self\" class=\"lnkSmall\">".$db[$keys][$key]["meta"]."</a>";

			}

			if ($db[$keys]["archive"] == true) echo "<a href=\"".$db[$keys]["path"]."/zip.zip\" target=\"_self\" class=\"lnkSmall\">ZIP</a>"; 

			echo "	</td>\n";

			echo "</tr>\n";

		}

	}

	function saveSelected() {
		$arr = array();
		$arr = $_POST["status"];
		if(!empty($arr)) {
			$arr = implode("|", $arr);
		}
		$txt = "status.txt";
		$txt_o = fopen($txt, 'w') or die("Oops! File not there!");
		fwrite($txt_o, $arr);
		fclose($txt_o);
	}

	
	
	function saveSelected2() {
		$arr2 = array();
		$arr2 = $_POST["status2"];
		if(!empty($arr2)) {
			$arr2 = implode("|", $arr2);
		}
		$txt2 = "status2.txt";
		$txt_o2 = fopen($txt2, 'w') or die("Oops! File not there!");
		fwrite($txt_o2, $arr2);
		fclose($txt_o2);
	}
	
			if($_POST["update"] == "yes") {
		saveSelected();
		saveSelected2();
	}


?>





<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">

<head>

<link rel="stylesheet" type="text/css" href="css/style.css" />

<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

<title>Fubar</title>

</head>

<body leftmargin="0" topmargin="0" marginwidth="0" marginheight="0">

<table width="100%" height="100%" border="0" cellpadding="0" cellspacing="0" style="margin: 0px; padding: 0px;">

		<tr>

				<td height="110" style="background-image: url(img/img_stroke.gif); background-position: bottom; background-repeat: repeat-x; padding: 0px;"><table width="100%" height="100%" border="0" cellpadding="0" cellspacing="0">

								<tr>

										<td><img src="img/img_logo.jpg" width="355" height="118" /></td>

										<td class="links">
											
											
											<font style="float:right; display:block; font-size: 9px; color: #CCCCCC;"><a href="icons/index.zip" traget="_blank">Index for Icons (left column)</a></font>
										<br/>
											<font style="float:right; display:block; font-size: 9px; color: #CCCCCC;"><a href="limited/index.zip" traget="_blank">Index for Limited icons (right column)</a></font>
										
										</td>
					

								</tr>

						</table></td>

		</tr>

		<tr>

				<td style="background-position: top; background-repeat: repeat-x;"><table width="100%" height="100%" border="0" cellpadding="0" cellspacing="0">

								<tr>
										<td width="50%">
                                        <table width="100%" border="0" cellpadding="0" cellspacing="0" class="icons">
														<tr>

																<td colspan="4" class="header">Icons</td>

														</tr>

														<?php readLevel($level_icons); ?>

										</table>
                                        </td>
										<td width="50%">
                                        <table width="100%" border="0" cellpadding="0" cellspacing="0">
														<tr>

																<td colspan="4" class="header">Limited</td>
														 
														</tr>

														     <form method="post" action="">

			<input type="hidden" name="update" value="yes" />
			<input type="submit" value="Update" />
			<?php readLevel($level_limited); ?>
			
        </form>
														


										</table></td>

									</table></td>

								</tr>

						</table></td>

		</tr>

</table>

</body>

</html>

