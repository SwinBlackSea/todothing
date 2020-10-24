----------------------------------------脱敏 start--------------------------------------

begin
    for cr in (select t1.ROWID,t1.CERT_NO id_no,(translate(t1.CERT_NO,'AC0123456789Xx','ZY9876543210.。')) id_no_2
               from MOT_CST_INF_D t1)
        loop
            update MOT_CST_INF_D set CERT_NO = cr.id_no_2 where ROWID = cr.ROWID;
        end loop;
    commit;
end;


--将中文字符串替换为 第一个字符+...
begin
    for cr in (select t1.ROWID,t1.ZXR name from MOT_CST_RELEVANT_DAILY t1)
        loop
            update MOT_CST_RELEVANT_DAILY set ZXR = concat(substr(cr.name,1,1),'**') where ROWID = cr.ROWID;
        end loop;
    commit;
end;

----------------------------------------脱敏 end--------------------------------------
