<?

$name = $_GET['name'];
$country = $_GET['type'];
$path = $_GET['path'];

?>


<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<link rel="stylesheet" type="text/css" href="css/style.css" />
<meta http-equiv="Content-Type" content="text/html; charset=windows-1251" />
<title>Suncore - WinaGames</title>
</head>

<body leftmargin="0" topmargin="0" marginwidth="0" marginheight="0">

<table width="100%" height="100%" border="0" cellpadding="0" cellspacing="0" style="margin: 0px; padding: 0px;">
	<tr><td height="80" style="background-image: url(img/img_stroke.gif); background-position: bottom; background-repeat: repeat-x; padding: 0px;"><table width="100%" height="100%" border="0" cellpadding="0" cellspacing="0">
		<tr><td><a href="index.php" target="_self"><img src="img/img_logo_small.jpg" width="217" height="72" border="0" /></a></td><td class="links"><!--<font style="font-size: 9px; color: #CCCCCC;">v 1.0</font><br /><br /><br /><br />Latest projects<br /><a href="archive/" target="_self" class="lnk">Archive</a><br /><a href="creativedirectives/" target="_blank" class="lnk">Creative directives</a>--></td></tr>
	</table></td></tr>
	<tr><td style="background-image: url(img/bg_header.gif); background-position: top; background-repeat: repeat-x;"><table width="100%" height="100%" border="0" cellpadding="0" cellspacing="0"><tr>
		<td width="20%"><table width="100%" height="100%" border="0" cellpadding="0" cellspacing="0">
			<tr><td colspan="3" class="header"><?php echo $country; ?> - <?php echo $name; ?></td></tr>	
			<?php if (is_dir($path."/../drafts")) { ?><tr><td class="projectEx"><a href="<?php echo $path; ?>/../drafts/" target="_blank">Drafts</a></td><td class="date"><?php echo date("Y.m.d", filemtime($path."/../drafts")); ?></td></tr><?php } ?>
			<?php if (is_dir($path."/html_lp")) { ?><tr><td class="projectEx"><a href="<?php echo $path; ?>/html_lp/" target="_blank">Landing page</a></td><td class="date"><?php echo date("Y.m.d", filemtime($path."/html_lp")); ?></td></tr><?php } ?>
			<?php if (is_dir($path."/html_lp2")) { ?><tr><td class="projectEx"><a href="<?php echo $path; ?>/html_lp2/" target="_blank">Landing page 2</a></td><td class="date"><?php echo date("Y.m.d", filemtime($path."/html_lp2")); ?></td></tr><?php } ?>
			<?php if (is_dir($path."/html_em")) { ?><tr><td class="projectEx"><a href="<?php echo $path; ?>/html_em/" target="_blank">Newsletter</a></td><td class="date"><?php echo date("Y.m.d", filemtime($path."/html_em")); ?></td></tr><?php } ?>
			<?php if (is_dir($path."/html_mi")) { ?><tr><td class="projectEx"><a href="<?php echo $path; ?>/html_mi/" target="_blank">Mini</a></td><td class="date"><?php echo date("Y.m.d", filemtime($path."/html_mi")); ?></td></tr><?php } ?>
			<?php if (is_dir($path."/pop")) { ?><tr><td class="projectEx"><a href="<?php echo $path; ?>/pop/" target="_blank">Popup</a></td><td class="date"><?php echo date("Y.m.d", filemtime($path."/pop")); ?></td></tr><?php } ?>
			<?php if (is_dir($path."/ico")) { ?><tr><td class="projectEx"><a href="<?php echo $path; ?>/ico/" target="_blank">Icon</a></td><td class="date"><?php echo date("Y.m.d", filemtime($path."/ico")); ?></td></tr><?php } ?>
			<?php if (is_dir($path."/swf")) { ?><tr><td class="projectEx"><a href="<?php echo $path; ?>/swf/" target="_blank">Flash banners</a></td><td class="date"><?php echo date("Y.m.d", filemtime($path."/swf")); ?></td></tr><?php } ?>
			<?php if (is_dir($path."/gif")) { ?><tr><td class="projectEx"><a href="<?php echo $path; ?>/gif/" target="_blank">Gif banners</a></td><td class="date"><?php echo date("Y.m.d", filemtime($path."/gif")); ?></td></tr><?php } ?>
			<?php if (is_dir($path."/oth")) { ?><tr><td class="projectEx"><a href="<?php echo $path; ?>/oth/" target="_blank">Other</a></td><td class="date"><?php echo date("Y.m.d", filemtime($path."/oth")); ?></td></tr><?php } ?>
			<tr><td colspan="3" class="header" height="30"><img src="img_blank.gif" width="1" height="1" border="0" /></td></tr>							
			<?php if (is_file($path."/zip.zip")) { ?><tr><td class="projectEx"><a href="<?php echo $path; ?>/zip.zip" target="_self">ZIP archive with files</a></td><td class="date"><?php echo date("Y.m.d", filemtime($path."/zip.zip")); ?></td></tr><?php } ?>
			<?php if (is_file($path."/../zip.zip")) { ?><tr><td class="projectEx"><a href="<?php echo $path; ?>/../zip.zip" target="_self">ZIP archive with files (whole project, all languages)</a></td><td class="date"><?php echo date("Y.m.d", filemtime($path."/../zip.zip")); ?></td></tr><?php } ?>
		</table></td>
	</tr></table></td></tr>
</table>


</body>
</html>
