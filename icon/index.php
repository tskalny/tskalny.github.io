
<?php
	
	if ($_GET['tr'] == 1) {
		$transparent = true;
	} else {
		$transparent = false;
	}
	
	if ($_GET['sa'] == 1) {
		$scriptaccess = true;
	} else {
		$scriptaccess = false;
	}
	
	if ($_GET['fs'] == 1) {
		$fullscreen = true;
	} else {
		$fullscreen = false;
	}
	
	if ($_GET['ct']) {
		$clicktag = $_GET['ct'];
	} else {
		$clicktag = false;
	}
	
	if ($_GET['sort'] == "az") {
		$sort = "az";
	} else if ($_GET['sort'] == "za") {
		$sort = "za";
	} else if ($_GET['sort'] == "0") {
		$sort = "0";
	} else {
		$sort = "za";
	}
	
	function getMeta($filePath) {
		if (is_file($filePath)) { 
			$date = explode("_", $fileName);
			$file = file($filePath);
			
			$data = explode("|", $file[1]);
			$data[2] = $date[0];
		} else {
			$data = array("Undefined", "UN", "2000-00"); 
		}
		
		return $data;
	}
	
	function readFiles($level0) { 
		global $sort;
		
		$index = array();
		$db = array();
		
		if (is_dir($level0)) { 
			if ($handler0 = opendir($level0)) { 
				while (($level1 = readdir($handler0)) !== false) { 
					$name = $level1;
					$extension = substr($name, -strpos(strrev($name), "."));
					
					if (is_file($level0."/".$level1)) { 
						if ($extension == "gif" || $extension == "GIF" || $extension == "png" || $extension == "PNG" || $extension == "jpg" || $extension == "JPG" || $extension == "jpeg" || $extension == "JPEG" || $extension == "swf" || $extension == "SWF") {
							$index[$level1] = $level1;
							$db[$level1] = array();
							$db[$level1]["name"] = $name;
							$db[$level1]["path"] = $level0."/".$level1;
							$db[$level1]["path"] = str_replace("./", "", $db[$level1]["path"]);
							$db[$level1]["extension"] = $extension;
							$db[$level1]["size"] = getSize(filesize($level0."/".$level1));
							$db[$level1]["params"] = getParams($level0."/".$level1);
						}
					}
				}
			}
		}
		
		if ($sort == "az") {
			ksort($index);
		} if ($sort == "za") {
			krsort($index);
		} else {
			//krsort($index);
		}
		
		showFiles($index, $db);
	}
	
	function showFiles($index, $db) {
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
		global $transparent, $clicktag, $scriptaccess, $fullscreen;
		
		$count = 0;
		foreach ($index as $keys => $value) {
			if (in_array($db[$keys]["name"], $s_all)) {
				$status = 'checked="checked"';
			} else { 
				$status = '';
			}
			$count++;
			echo "<div class='itm' style='float:left; width:250px; height:250px'>\n";
			echo "	<div><img src='".$db[$keys]["path"]."' width='".$db[$keys]["params"][0]."' height='".$db[$keys]["params"][1]."' border='0' alt='' /></div>\n";
			echo "	<div class='exp'>".$db[$keys]["name"]." (".$db[$keys]["params"][0]."x".$db[$keys]["params"][1]." / ".$db[$keys]["size"].")<br/><a href='".$db[$keys]["path"]."' target='_blank'>Download using right-click</a></div>\n";
			echo "<input type='checkbox' name='status[]' value='".$db[$keys]["name"]."' ".$status." />";
			echo "</div>\n";
		}
	}
	
	function getSize($size) {
		$kb = 1024; 
		$mb = 1024 * $kb;
		$gb = 1024 * $mb;
		$tb = 1024 * $gb;
	
		if ($size < $kb) {
			return $size." B";
		} else if($size < $mb) {
			return round($size/$kb, 2)."KB";
		} else if($size < $gb) {
			return round($size/$mb, 2)."MB";
		} else if($size < $tb) {
			return round($size/$gb, 2)."GB";
		} else {
			return round($size/$tb, 2)."TB";
		}
	}
	
	function getParams($file) {
		$size = getimagesize($file);
		return array($size[0], $size[1], $size[2]);
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
	
	$meta = getMeta("../meta.txt");
	if($_POST["update"] == "yes") {
		saveSelected();
	}
?>


<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>Fubar Icons 200x200</title>
		<script type="text/javascript" src="http://demo.mediamenu.ee/aol/swfobject.js"></script>
		<script type="text/javascript" language="javascript">
			<!--
			function changebgcolor(color1, color2) {
				document.bgColor = color1;
				document.getElementById('top').bgColor = color2;
				var devs = document.getElementsByTagName('td');
				for (var i=1; i <= devs.length; i++) {
					document.getElementById('dev'+i).bgColor = color2;
				}
			}
			//-->
		</script>
		<style type="text/css">
			body { margin: 0px;font-family: Arial, Helvetica, sans-serif; font-size: 11px; color: #666666;}
			div { text-align: center; }
			a { color: #88ceff; text-decoration: none; }
			a:hover { color: #57baff; text-decoration: none; }
			.itm { padding:40px 25px;  }
			.exp { padding: 5px; }
			.top { height: 40px; padding: 0px 20px 0px 20px;}
		</style>
	</head>
	
	<body onload="javscript:document.bgColor = 'black';">
		<table width="100%" cellpadding="0" cellspacing="0" style="margin: 0 0 20px 0;>
			<tr><td class="top" bgcolor="#eeeeee">
				<table width="100%" cellpadding="0" cellspacing="0">
					<tr>
						<td width="105" style="text-align: left; color: #666666;">Background color:</td>
						<td width="30" style="background-color: #ffffff; cursor: pointer;" onclick="javascript:changebgcolor('#ffffff', '#eeeeee');"></td>
						<td width="30" style="background-color: #cccccc; cursor: pointer;" onclick="javascript:changebgcolor('#cccccc', '#dddddd');"></td>
						<td width="30" style="background-color: #888888; cursor: pointer;" onclick="javascript:changebgcolor('#888888', '#999999');"></td>
						<td width="30" style="background-color: #222222; cursor: pointer;" onclick="javascript:changebgcolor('#222222', '#333333');"></td>
						<td width="30" style="background-color: #000000; cursor: pointer;" onclick="javascript:changebgcolor('#000000', '#111111');"></td>
						<td style="text-align: right; color: #666666;"></td>
					</tr>
				</table>
			</td></tr>
		</table>
        <form method="post" action="">
		<div><input type="submit" value="Update" /><br /></div>
		<?php readFiles("."); ?>
        <div style="clear:both;">
			<input type="hidden" name="update" value="yes" />
			<input type="submit" value="Update" />
		</div>
		<br />
        </form>
	</body>
</html>