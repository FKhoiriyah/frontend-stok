let urlapi = "https://project1-ta.et.r.appspot.com/api"

function selectElement(id, valueToSelect) {
    let element = document.getElementById(id);
    element.value = valueToSelect;
}

tampilDataTabel();

//Fungsi mengedit data
function editData() {
    $.ajax({
        type: "PUT", // Menggunakan PUT untuk mengedit data
        url: urlapi + "/editbarang",
        contentType: 'application/json',
        data: JSON.stringify({
            kode_barang: $("#kode_barang_edit").val(),
            nm_barang: $("#nm_barang_edit").val(),
            id_barangjns: $("#id_barangjns_edit").val(),
            stok: $("#stok_edit").val(),
            harga: $("#harga_edit").val()
        }),
        success: function (respon) {
            if (respon === "sukses") {
                $("#pesan_proses").html("<div class='alert alert-success'>Berhasil mengedit data</div>");
                $("#pesan_proses").removeClass('alert-danger').addClass('alert-success').show();
                tampilDataTabel();
            } else {
                $("#pesan_proses").html("<div class='alert alert-danger'>Gagal mengedit data: </div>" + respon);
                $("#pesan_proses").removeClass('alert-success').addClass('alert-danger').show();
            }
            $('#modalEdit').modal('hide');

            // Menghilangkan alert setelah beberapa detik
            setTimeout(function() {
                $("#pesan_proses").hide();
            }, 2500); // 2500 milidetik = 2,5 detik

        },
        error: function (xhr, status, error) {
            console.log('Error:', xhr.responseText);
            $("#pesan_proses").html("<div class='alert alert-danger'>Gagal mengedit data: " + xhr.responseText + "</div>");
            $("#pesan_proses").removeClass('alert-success').addClass('alert-danger').show();

            // Menghilangkan alert setelah beberapa detik
            setTimeout(function() {
                $("#pesan_proses").hide();
            }, 2500); // 2500 milidetik = 2,5 detik
        }
    });
}

//Fungsi menghapus data
function hapusData() {
    $.ajax({
        type: "DELETE", //Menggunakan DELETE untuk menghapus data
        url: urlapi + "/hapusbarang",
        contentType: 'application/json',
        data: JSON.stringify({
            kode_barang: $("#kode_barang_hapus").val()
        }),
        success: function (respon) {
            if (respon === "sukses") {
                $("#pesan_proses").html("<div class='alert alert-success'>Berhasil menghapus data</div>");
                $("#pesan_proses").removeClass('alert-danger').addClass('alert-success').show();
                tampilDataTabel();
            } else {
                $("#pesan_proses").html("<div class='alert alert-danger'>Gagal menghapus data: </div>" + respon);
                $("#pesan_proses").removeClass('alert-success').addClass('alert-danger').show();
            }
            $('#modalHapus').modal('hide');

            // Menghilangkan alert setelah beberapa detik
            setTimeout(function() {
                $("#pesan_proses").hide();
            }, 2500); // 2500 milidetik = 2,5 detik
        },
        error: function (xhr, status, error) {
            console.log('Error:', xhr.responseText);
            $("#pesan_proses").html("<div class='alert alert-danger'>Gagal menghapus data: " + xhr.responseText + "</div>");
            $("#pesan_proses").removeClass('alert-success').addClass('alert-danger').show();

            // Menghilangkan alert setelah beberapa detik
            setTimeout(function() {
                $("#pesan_proses").hide();
            }, 2500); // 2500 milidetik = 2,5 detik
        }
    });
}

//Fungsi menambah data
function simpanData() {
    $.ajax({
        type: "POST", // Menggunakan POST untuk menambah data
        url: urlapi + "/tambahbarang",
        contentType: 'application/json',
        data: JSON.stringify({
            kode_barang: $("#kode_barang").val(),
            nm_barang: $("#nm_barang").val(),
            id_barangjns: $("#id_barangjns").val(),
            stok: $("#stok").val(),
            harga: $("#harga").val()
        }),
        success: function (respon) {
            console.log('Response:', respon);
            if (respon === "sukses") {
                $("#pesan_proses").html("<div class='alert alert-success'>Berhasil menambah data</div>");
                $("#pesan_proses").removeClass('alert-danger').addClass('alert-success').show();
                tampilDataTabel();
            } else {
                $("#pesan_proses").html("<div class='alert alert-danger'>Gagal menambah data: </div>" + respon);
                $("#pesan_proses").removeClass('alert-success').addClass('alert-danger').show();
            }
            $('#modalTambah').modal('hide');

            // Menghilangkan alert setelah beberapa detik
            setTimeout(function() {
                $("#pesan_proses").hide();
            }, 2500); // 2500 milidetik = 2,5 detik
        },
        error: function (xhr, status, error) {
            console.log('Error:', xhr.responseText);
            $("#pesan_proses").html("<div class='alert alert-danger'>Gagal menambah data: " + xhr.responseText + "</div>");
            $("#pesan_proses").removeClass('alert-success').addClass('alert-danger').show();

            // Menghilangkan alert setelah beberapa detik
            setTimeout(function() {
                $("#pesan_proses").hide();
            }, 2500); // 2500 milidetik = 2,5 detik
        }
    });
}

//Ajax menampilkan barang
function tampilDataTabel() {
    $.ajax({
        type: "GET",
        url: urlapi + "/databarang",
        success: function (respon) {
            console.log('Data Barang:', respon);
            let jumdata = respon.length;
            let isi_tabel = "";
            let nomor = 1;
            for (let i = 0; i < jumdata; i++) {
                isi_tabel += `
                    <tr>
                        <td>${nomor}</td>
                        <td>${respon[i].kode_barang}</td>
                        <td>${respon[i].nm_barang}</td>
                        <td>${respon[i].nm_barangjns}</td>
                        <td>${respon[i].stok}</td>
                        <td>${respon[i].harga}</td>
                        <td>
                            <div class="btn-group">
                                <a href="#" class="btn btn-primary btedit" data-toggle="modal" data-target="#modalEdit" data-id="${respon[i].kode_barang}">Edit</a>
                                <a href="#" class="btn btn-danger bthapus" data-toggle="modal" data-target="#modalHapus" data-id="${respon[i].kode_barang}" data-nama="${respon[i].nm_barang}">Hapus</a>
                            </div>
                        </td>
                    </tr>
                `;
                nomor++;
            }
            $("#data_barang").html(isi_tabel);
        },
        error: function (xhr, status, error) {
            console.log('Error:', xhr.responseText);
            $("#pesan_proses").html("<div class='alert alert-danger'>Gagal menampilkan data: " + xhr.responseText + "</div>");
        }
    });
}

//Ajax menampilkan jenis barang ke combo box
$.ajax({
    type: "GET", // Menggunakan GET untuk mengambil jenis barang
    url: urlapi + "/barangjns",
    success: function (respon) {
        console.log('Jenis Barang:', respon);
        let jumdata = respon.length;
        $("#id_barangjns").html("<option value=''>[ Pilih jenis barang ]</option>");
        $("#id_barangjns_edit").html("<option value=''>[ Pilih jenis barang ]</option>");
        for (let i = 0; i < jumdata; i++) {
            $("#id_barangjns").append(`<option value='${respon[i].id_barangjns}'>${respon[i].nm_barangjns}</option>`);
            $("#id_barangjns_edit").append(`<option value='${respon[i].id_barangjns}'>${respon[i].nm_barangjns}</option>`);
        }
    },
    error: function (xhr, status, error) {
        console.log('Error:', xhr.responseText);
        $("#pesan_proses").html("<div class='alert alert-danger'>Gagal menampilkan jenis barang: " + xhr.responseText + "</div>");
    }
});

$(document).on('click', '.bthapus', function () {
    const id = $(this).data('id');
    const nama = $(this).data('nama');
    $("#kode_barang_hapus").val(id);
    $("#nama_hapus").html(nama);
});

$(document).on('click', '.btedit', function () {
    const id = $(this).data('id');
    $("#kode_barang_edit").val(id);
    $.ajax({
        type: "GET", // Menggunakan GET untuk mendapatkan barang berdasarkan ID
        url: urlapi + "/getbarangbyid/" + id, // Menambahkan ID sebagai parameter path
        contentType: 'application/json',
        data: JSON.stringify({ kode_barang: id }),
        success: function (respon) {
            console.log('Barang by ID:', respon);
            $("#nm_barang_edit").val(respon[0].nm_barang);
            $("#stok_edit").val(respon[0].stok);
            $("#harga_edit").val(respon[0].harga);
            selectElement("id_barangjns_edit", respon[0].id_barangjns);
        },
        error: function (xhr, status, error) {
            console.log('Error:', xhr.responseText);
            $("#pesan_proses").html("<div class='alert alert-danger'>Gagal menampilkan data barang: " + xhr.responseText + "</div>");
        }
    });
});
